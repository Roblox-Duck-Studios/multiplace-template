import { ReplicatedStorage, StarterPlayer, RunService } from "@rbxts/services";
import { TestBootstrap, Reporters } from "@rbxts/testez";

if (!RunService.IsRunning()) {
	const results = TestBootstrap.run(
		[
			StarterPlayer.WaitForChild("StarterPlayerScripts").WaitForChild("TS").WaitForChild("__tests__"),
			StarterPlayer.WaitForChild("StarterPlayerScripts").WaitForChild("common").WaitForChild("__tests__"),
			ReplicatedStorage.WaitForChild("TS").WaitForChild("__tests__"),
			ReplicatedStorage.WaitForChild("TS").WaitForChild("__tests__"),
		],
		Reporters.TextReporter,
	);
	if (results.errors.size() > 0 || results.failureCount > 0) {
		error("Tests failed!");
	}
}
