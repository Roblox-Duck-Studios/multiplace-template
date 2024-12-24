--I got a bit lazy, this is quite hardcoded
local roblox = require("@lune/roblox")
local fs = require("@lune/fs")
local serde = require("@lune/serde")

local download = require("download")
local sync = require("../sync/helpers/build").entry
local remove = require("../configs/remove")

local upstream = roblox.deserializePlace(download())

for _, instance in upstream:GetDescendants() do
	if table.find(remove, instance.Name) then
		instance.Parent = nil
	end
end

fs.writeFile(
	"places/demo/build.rbxl",
	sync("places/demo", serde.decode("json", fs.readFile("places/demo/default.project.json")), upstream)
)
