local roblox = require("@lune/roblox")
local fs = require("@lune/fs")
local luau = require("@lune/luau")
local process = require("@lune/process")
local stdio = require("@lune/stdio")
local task = require("@lune/task")

local signal = require("mock-signal")

local testPlacePath = process.args[1]

local game = roblox.deserializePlace(fs.readFile(testPlacePath))

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

-- TestEZ uses TestService:Error() when tests fail
roblox.implementMethod("TestService", "Error", function(self, description: string, source: Instance?, line: number?)
	stdio.ewrite(`{description}\n`)
end)

-- Promise.lua indexes RunService.Heartbeat, but only uses it in Promise.defer and Promise.delay
roblox.implementProperty("RunService", "Heartbeat", function()
	return signal.new()
end, function() end)

roblox.implementProperty("RunService", "PostSimulation", function()
	return signal.new()
end, function() end)

roblox.implementMethod("RunService", "IsStudio", function()
	return true
end)

roblox.implementMethod("RunService", "IsServer", function()
	return true
end)

roblox.implementMethod("RunService", "IsClient", function()
	return false
end)

roblox.implementMethod("DataModel", "BindToClose", function()
	return signal.new()
end)

roblox.implementMethod("RunService", "IsRunning", function()
	return false
end)

roblox.implementMethod("DataModel", "IsLoaded", function()
	return true
end)

roblox.implementMethod("DataStoreService", "GetDataStore", function()
	return {}
end)

roblox.implementProperty("BindableEvent", "Event", function()
	return signal.new()
end)

roblox.implementMethod("HttpService", "JSONEncode", function()
	return nil
end)

local robloxRequire

local function runRobloxScript(script: Script | LocalScript | ModuleScript)
	local callableFn = luau.load(luau.compile(script.Source), {
		debugName = script:GetFullName(),
		environment = tableJoin(roblox, {
			Instance = roblox.Instance,
			game = game,
			script = script,
			require = robloxRequire,
			tick = tick,
			task = task,
			Enum = {
				DataStoreRequestType = {
					GetAsync = 0,
					SetIncrementAsync = 1,
					UpdateAsync = 2,
					GetSortedAsync = 3,
					SetIncrementSortedAsync = 4,
					OnUpdate = 5,
					ListAsync = 6,
					GetVersionAsync = 7,
					RemoveVersionAsync = 8,
				},
			},
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

stdio.write(stdio.color("red"))
stdio.write(stdio.style("bold"))

runRobloxScript(game.ServerScriptService.TS["run-tests"])
