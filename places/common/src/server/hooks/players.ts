import { Modding, OnStart, Service } from "@flamework/core";
import { Players } from "@rbxts/services";

import { OnPlayerLeave, OnPlayerJoin } from ".";

@Service({ loadOrder: 1 })
export class PlayerSpawnService implements OnStart {
	private readonly leaveListener = new Set<OnPlayerLeave>();
	private readonly joinListener = new Set<OnPlayerJoin>();

	onStart(): void {
		Modding.onListenerAdded<OnPlayerJoin>((obj) => this.joinListener.add(obj));
		Modding.onListenerRemoved<OnPlayerJoin>((obj) => this.joinListener.add(obj));
		Modding.onListenerAdded<OnPlayerLeave>((obj) => this.leaveListener.add(obj));
		Modding.onListenerRemoved<OnPlayerLeave>((obj) => this.leaveListener.add(obj));

		for (const player of Players.GetPlayers())
			for (const listener of this.joinListener) task.spawn(() => listener.onPlayerJoin(player));

		Players.PlayerAdded.Connect((player) => {
			for (const listener of this.joinListener) task.spawn(() => listener.onPlayerJoin(player));
		});

		Players.PlayerRemoving.Connect((player) => {
			for (const listener of this.leaveListener) task.spawn(() => listener.onPlayerLeave(player));
		});
	}
}
