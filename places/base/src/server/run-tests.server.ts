import { ServerScriptService, ReplicatedStorage, RunService } from "@rbxts/services";
import { TestBootstrap, Reporters } from "@rbxts/testez";

if (!RunService.IsRunning()) {
	const results = TestBootstrap.run(
		[
			ServerScriptService.WaitForChild("TS").WaitForChild("__tests__"),
			ServerScriptService.WaitForChild("common").WaitForChild("__tests__"),
			ReplicatedStorage.WaitForChild("TS").WaitForChild("__tests__"),
			ReplicatedStorage.WaitForChild("common").WaitForChild("__tests__"),
		],
		Reporters.TextReporter,
	);
	if (results.errors.size() > 0 || results.failureCount > 0) {
		error("Tests failed!");
	}
}
