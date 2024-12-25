--[[
	Automatically extracts all the models into a folder
	Usage: lune run extract-models <RBXL_PATH> <FOLDER_NAME>
]]
local roblox = require("@lune/roblox")
local process = require("@lune/process")
local fs = require("@lune/fs")

local SYNC_SERVICES = { "Workspace", "ReplicatedStorage", "ServerStorage" }
local IGNORE_SHALLOW_NAMES = { "TS", "common", "rbxts_include" }
local DELETE_SCRIPTS = { "ReplicatedStorage", "ReplicatedFirst", "StarterPlayer", "ServerScriptService" }

local path = process.args[1]
local output = process.args[2]

assert(path, "Please provide a path")
assert(fs.isFile(path), "Provided path doesn't exist")
assert(path:find(".rbxl"), "Provided path isn't .rbxl")
assert(type(output) == "string", "Please provide a output directory")

local game = roblox.deserializePlace(fs.readFile(path))

if not fs.isDir(`store/{output}`) then
	fs.writeDir(`store/{output}`)
end

--removes all the scripts that are built to sync
for _, ServiceName in DELETE_SCRIPTS do
	for i, child in game:GetService(ServiceName):GetChildren() do
		if ServiceName == "StarterPlayer" and child.Name == "StarterPlayerScripts" then
			--things are replicated under `StarterPlayerScripts` should be deleted instead
			for i, descendent in child:GetChildren() do
				if table.find(IGNORE_SHALLOW_NAMES, descendent.Name) then
					descendent:Destroy()
				end
			end
		end
		if table.find(IGNORE_SHALLOW_NAMES, child.Name) then
			child:Destroy()
		end
	end
end

for _, ServiceName in SYNC_SERVICES do
	local rbxm = roblox.serializeModel(game[ServiceName]:GetChildren())
	fs.writeFile(`store/{output}/{ServiceName}.rbxm`, rbxm)
end
