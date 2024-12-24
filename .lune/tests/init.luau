local process = require("@lune/process")
local serde = require("@lune/serde")
local fs = require("@lune/fs")
local roblox = require("@lune/roblox")
local luau = require("@lune/luau")
local net = require("@lune/net")
local task = require("@lune/task")
local stdio = require("@lune/stdio")

local sync = require("../sync/helpers/build")
local remove = require("../configs/remove")

--lune run sync <directory> <OPTIONAL: project file DEFAULT: default.project.json>

local directory: string = process.args[1]
local project = process.args[2] or "default.project.json"
local projectFile = serde.decode("json", (fs.readFile(`{directory}/{project}`)))
assert(directory, "Please provide a directory")
assert(projectFile, "Cannot find default.project.json")

local upstream = roblox.deserializePlace(fs.readFile(`{directory}/build.rbxl`))

for _, instance in upstream:GetDescendants() do
	if table.find(remove, instance.Name) then
		instance.Parent = nil
	end
end

local game = roblox.deserializePlace(sync.entry(directory, projectFile, upstream))

local function tableJoin(...)
	local result = {}
	for i = 1, select("#", ...) do
		for k, v in select(i, ...) do
			result[k] = v
		end
	end
	return result
end

-- not 100% accurate to tick() functionality, but good enough for TestEZ usage
local function tick()
	return os.clock()
end

-- RuntimeLib uses :WaitForChild(), but tests don't need networking so :FindFirstChild() should be fine
roblox.implementMethod("Instance", "WaitForChild", function(self, ...)
	return self:FindFirstChild(...)
end)

-- Promise.lua indexes RunService.Heartbeat, but only uses it in Promise.defer and Promise.delay
roblox.implementProperty("RunService", "Heartbeat", function()
	return {}
end, function() end)

roblox.implementMethod("RunService", "IsStudio", function()
	return false
end)

roblox.implementMethod("RunService", "IsRunning", function()
	return false
end)

roblox.implementMethod("HttpService", "JSONEncode", function(tbl)
	if type(tbl) ~= "table" then
		return {}
	end
	return net.jsonEncode(tbl)
end)

roblox.implementMethod("TestService", "Error", function(msg)
	stdio.write(stdio.color("red"))
	print(msg)
	stdio.write(stdio.color("reset"))
	return {}
end)

function err(msg)
	print(msg)
	process.exit(1)
end

local robloxRequire

local function runRobloxScript(script: Script | LocalScript | ModuleScript)
	local callableFn = luau.load(luau.compile(script.Source, { optimizationLevel = 1, debugLevel = 0 }), {
		debugName = script:GetFullName(),
		environment = tableJoin(roblox, {
			game = game,
			script = script,
			require = robloxRequire,
			tick = tick,
			task = task,
			error = err,
		}),
	})

	return callableFn()
end

local requireCache = {}

function robloxRequire(moduleScript: ModuleScript)
	-- the same script instance sometimes gives a different ref
	-- unsure why, but using :GetFullName() fixes this for now
	local scriptPath = moduleScript:GetFullName()
	local cached = requireCache[scriptPath]
	if cached then
		return table.unpack(cached)
	end

	local result = table.pack(runRobloxScript(moduleScript))
	requireCache[scriptPath] = result
	return table.unpack(result)
end

print("Running tests for StarterPlayerScripts...")
runRobloxScript(game:GetService("TestService").tests.client)
print("\n\n")

print("Running tests for ServerScriptService...")
runRobloxScript(game:GetService("TestService").tests.server)
print("\n\n")

print("Running tests for ReplicatedStorage...")
runRobloxScript(game:GetService("TestService").tests.shared)
print("\n\n")
