local fs = require("@lune/fs")
local serde = require("@lune/serde")

local types = require("types")

type script = Script | LocalScript | ModuleScript

local util = {}

function util.getScriptType(fileName: string): "Script" | "LocalScript" | "ModuleScript" | nil
	if fileName:match("%.server%.lua[u]?$") then
		return "Script"
	elseif fileName:match("%.client%.lua[u]?$") then
		return "LocalScript"
	elseif fileName:match("%.lua[u]?$") then
		return "ModuleScript"
	end
	return nil
end

function util.isScript(fileName: string): boolean
	if fileName:match("%.server%.lua[u]?$") then
		return true
	elseif fileName:match("%.client%.lua[u]?$") then
		return true
	elseif fileName:match("%.lua[u]?$") then
		return true
	end
	return false
end

function util.isJsonModel(fileName: string): boolean
	if fileName:match("%.model.json$") then
		return true
	end
	return false
end

--detects if the file name ends with .rbxm or .rbxmx
function util.isRbxm(fileName: string)
	return fileName:match("%.rbx[ma]x$") ~= nil
end

function util.isInitFile(fileName: string)
	return fileName:match("^init%.model%.json$")
		or fileName:match("^init%.meta%.json$")
		or fileName:match("^init%.lua$")
		or fileName:match("^init%.luau$")
		or fileName:match("^int%.client%.lua$")
		or fileName:match("^int%.client%.luau$")
		or fileName:match("^int%.server%.lua$")
		or fileName:match("^int%.server%.luau$")
end

function util.isMetadata(fileName: string): boolean
	if fileName:match("%.meta.json$") then
		return true
	end
	return false
end

function util.getInitFile(path: string): string | nil
	assert(fs.isDir(path), "provided path isn't directory")
	for i, file in fs.readDir(path) do
		if util.isInitFile(file) then
			return file
		end
	end
	return nil
end

--parents a instance or a table of instances to a single parent
function util.parent(instance: Instance | { Instance }, parent: Instance)
	if typeof(instance) == "table" then
		for i, child in instance do
			child.Parent = parent
		end
	else
		instance.Parent = parent
	end
end

--[[ Only finds for default.project.json ]]
function util.readProjectFile(path: string): types.ProjectTree?
	assert(fs.isDir(path), `provided path isn't a directory {path}]`)
	local sucess = pcall(function()
		return serde.decode("json", fs.readFile(`{path}/default.project.json`))
	end)
	if not sucess then
		return nil
	else
		return serde.decode("json", fs.readFile(`{path}/default.project.json`))
	end
end

function util.getMetadata(path: string, name: string)
	assert(fs.isDir(path), "provided path isn't directory")
	for _, file in fs.readDir(path) do
		if name == `{name}.meta.json` then
			return fs.readFile(`{name}.meta.json`)
		end
	end
	return nil
end

function util.getFileExtension(fileName: string): string | nil
	return fileName:match("%.client%.luau$")
		or fileName:match("%.server%.luau$")
		or fileName:match("%.client%.lua$")
		or fileName:match("%.server%.lua$")
		or fileName:match("%.luau$")
		or fileName:match("%.lua$")
end

--combines the path with the new pointer
function util.combine(path: string, pointer: string)
	return path .. "/" .. pointer
end

--extracts the file path, returning it with a name. Useful for seeing what the folder name is
function util.extract(path: string)
	return path:match("([^/\\]+)$")
end

--excludes the file extension, gives the pure name of it
function util.getFileName(fileName: string): string
	local extensions = { ".client.lua", ".server.lua", ".client.luau", ".server.luau", ".lua", ".luau" }

	for _, ext in ipairs(extensions) do
		if fileName:sub(-#ext) == ext then
			return fileName:sub(1, -(#ext + 1))
		end
	end

	return fileName
end
--returns the last file
function util.reduce(path)
    -- Find the last slash in the path
    local lastSlash = path:match("^(.*)/[^/]*$")
    -- Return the reduced path or the original path if no slashes were found
    return lastSlash or path
end

return util
