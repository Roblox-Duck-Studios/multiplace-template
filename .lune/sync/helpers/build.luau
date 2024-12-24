local roblox = require("@lune/roblox")
local fs = require("@lune/fs")
local serde = require("@lune/serde")

local util = require("utils")
local types = require("types")
local Instance = roblox.Instance

local build = {}

function build.model(json: types.MockInstance)
	local function buildInstance(data: types.MockInstance)
		local instance = Instance.new(data.ClassName)
		for prop, val in data do
			if not (prop == "Children" or prop == "ClassName") then
				instance[prop] = val
			end
		end
		if data.Children then
			for _, child in data.Children do
				buildInstance(child)
			end
		end
		return instance
	end
	return buildInstance(json)
end

function build.script(path: string, file: string, overrideName: string?): Script
	local name = overrideName or util.getFileName(file)
	local metadata = util.getMetadata(path, name) :: types.Metadata?
	local instance = Instance.new(util.getScriptType(file)) :: Script
	instance.Source = fs.readFile(util.combine(path, file))
	instance.Name = name
	if metadata then
		for propName, propValue in metadata.properties do
			instance[propName] = propValue
		end
	end
	return instance
end

--directory name overrides the init file's name
function build.directory(path: string, parent: Instance?)
	if fs.isDir(path) then
		local instance = parent or Instance.new("Folder")
		if not parent then
			instance.Name = util.extract(path)
		end
		if util.getInitFile(path) then
			local initFile = util.getInitFile(path)
			local contents = fs.readFile(util.combine(path, initFile))
			if util.isMetadata(initFile) then
				instance = Instance.new((serde.decode("json", contents) :: types.Metadata).className or "Folder")
				if (serde.decode("json", contents) :: types.Metadata).properties then
					for propName, propValue in (serde.decode("json", contents) :: types.Metadata).properties do
						instance[propName] = propValue
					end
				end
				instance.Name = util.extract(path)
			end
			--don't know if this is possible, but we will keep it.
			if util.isJsonModel(initFile) then
				instance = build.model(contents)
				instance.Name = util.extract(path)
			end
			if util.isScript(initFile) then
				instance = Instance.new(util.getScriptType(initFile)) :: Script
				instance.Source = fs.readFile(util.combine(path, util.getInitFile(path) :: string))
				instance.Name = util.extract(path)
			end
		end
		if util.readProjectFile(path) then
			local project = util.readProjectFile(path)
			instance = build.project(path, project)
		else
			for _, name in fs.readDir(path) do
				local newPath = util.combine(path, name)
				if fs.isDir(newPath) then
					local directory = build.directory(newPath)
					if directory then
						directory.Parent = instance
					end
				else
					if not util.isInitFile(name) and not util.isMetadata(name) then
						local contents = fs.readFile(newPath)

						if util.isJsonModel(name) then
							local child = build.model(serde.decode("json", contents))
							child.Parent = instance
						end
						if util.isRbxm(name) then
							local childs = roblox.deserializeModel(contents)
							for _, child in childs do
								child.Parent = instance
							end
						end
						if util.isScript(name) then
							local child = build.script(path, name)
							child.Parent = instance
						end
					end
				end
			end
		end
		if instance == parent then
			return nil
		else
			return instance
		end
	else
		--solves a edge case when the path project
		--file is referring to is a .rbxmx or just
		--a plain file.
		local contents = fs.readFile(path)
		local name = util.extract(path)
		if util.isJsonModel(name) then
			return build.model(serde.decode("json", contents))
		end
		if util.isRbxm(name) then
			return roblox.deserializeModel(contents)
		end
		if util.isScript(name) then
			print(build.script(util.reduce(path), name), parent)
			return build.script(util.reduce(path), name)
		end
		return error("cannot build something defined!")
	end
end

--builds depending on the project ifle
function build.project(path: string, project: types.ProjectTree, overrideInstance: Instance?)
	local instance = overrideInstance

	if project.tree["$className"] and not overrideInstance then
		instance = Instance.new(project.tree["$className"])
		instance.Name = project.name
	end

	if project.tree["$path"] then
		local child = build.directory(util.combine(path, project.tree["$path"]), instance)
		--This is hardcoded, specifically for react-vendor and treating .rbxmx files
		if type(child) == "table" then
			child = child[1]
		end
		child.Name = project.name

		if instance == nil then
			instance = child
		else
			child.Parent = instance
		end
	end

	for name: string, value: types.InstanceTree in project.tree :: any do
		if typeof(value) == "table" and name ~= "$properties" then
			local child = build.leaf(path, value, name)
			if child then
				if instance:FindFirstChild(child.Name) then
					for _, descendent in child:GetChildren() do
						descendent.Parent = instance[child.Name]
					end
				else
					util.parent(child, instance)
				end
				if value["$properties"] then
					for propName, propValue in value["$properties"] :: any do
						child[propName] = propValue
					end
				end
			end
		end
	end
	return instance
end

function build.leaf(path: string, tree: types.InstanceTree, name: string?)
	local instance = Instance.new(tree["$className"] or "Folder")

	if not (instance.ClassName == "DataModel") then
		instance.Name = name
		if tree["$properties"] then
			for propName: string, propValue: any in tree["$properties"] :: any do
				instance[propName] = propValue
			end
		end
	end

	if tree["$path"] then
		local child = build.directory(util.combine(path, tree["$path"]), instance)
		if child then
			child.Name = instance.Name
			instance = child
		end
	end

	for name: string, value: types.InstanceTree in tree :: any do
		if typeof(value) == "table" then
			if name ~= "$properties" then
				local child = build.leaf(path, value, name) :: Instance
				if child then
					util.parent(child, instance)
				end
			end
		end
	end
	return instance
end

function build.entry(path: string, project: types.ProjectTree, dataModel: DataModel?)
	return roblox.serializePlace(build.project(path, project, dataModel))
end

return build
