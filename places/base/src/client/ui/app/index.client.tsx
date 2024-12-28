import { createPortal, createRoot } from "@rbxts/react-roblox";
import React, { StrictMode } from "@rbxts/react";
import { Players } from "@rbxts/services";
import App from "client/ui/app/app";

const root = createRoot(new Instance("Folder"));
const target = Players.LocalPlayer.WaitForChild("PlayerGui");

root.render(
	createPortal(
		<StrictMode>
			<App />
		</StrictMode>,
		target,
	),
);
