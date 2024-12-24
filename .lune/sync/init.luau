local fs = require("@lune/fs")
local process = require("@lune/process")
local serde = require("@lune/serde")
local roblox = require("@lune/roblox")

local types = require("helpers/types")
local build = require("helpers/build")

local remove = require("../configs/remove")
--[[
Command line:
lune run sync <directory> <OPTIONAL: project file DEFAULT: default.project.json>
]]
local directory: string = process.args[1]
local project = process.args[2] or "default.project.json"
local projectFile: types.ProjectTree = serde.decode("json", (fs.readFile(`{directory}/{project}`)))
assert(directory, "Please provide a directory")
assert(projectFile, "Cannot find default.project.json")

local upstream = roblox.deserializePlace(fs.readFile(`{directory}/build.rbxl`))

for _, instance in upstream:GetDescendants() do
	if table.find(remove, instance.Name) then
		instance.Parent = nil
	end
end

fs.writeFile(`{directory}/build.rbxl`, build.entry(directory, projectFile, upstream))
