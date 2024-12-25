--[[
	Automatically syncs all the models from rbxm to a rbxl
	Usage: lune run sync-models <RBXL_PATH> <FOLDER_NAME>
]]

local roblox = require("@lune/roblox")
local process = require("@lune/process")
local fs = require("@lune/fs")

local SYNC_SERVICES = { "Workspace", "ReplicatedStorage", "ServerStorage" }

local path = process.args[1]
local output = process.args[2]

assert(path, "Please provide a path")
assert(fs.isFile(path), "Provided path doesn't exist")
assert(path:find(".rbxl"), "Provided path isn't .rbxl")
assert(type(output) == "string", "Please provide a output directory")

local game = roblox.deserializePlace(fs.readFile(path))

for _, ServiceName in SYNC_SERVICES do
	if fs.isFile(`store/{output}/{ServiceName}.rbxm`) then
		local models = roblox.deserializeModel(fs.readFile(`store/{output}/{ServiceName}.rbxm`))
		for _, child in models do
			child.Parent = game[ServiceName]
		end
	end
end

fs.writeFile(path, roblox.serializePlace(game))
