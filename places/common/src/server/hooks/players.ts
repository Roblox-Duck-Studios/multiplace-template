import { Modding, OnStart, Service } from "@flamework/core";
import { Players } from "@rbxts/services";

import { OnPlayerJoin, OnPlayerLeave } from ".";

@Service({ loadOrder: 1 })
export class PlayerSpawnService implements OnStart {
	private readonly JoinListeners = new Set<OnPlayerJoin>();
	private readonly LeaveListeners = new Set<OnPlayerLeave>();

	onStart(): void {
		Modding.onListenerAdded<OnPlayerJoin>((obj) => this.JoinListeners.add(obj));
		Modding.onListenerRemoved<OnPlayerJoin>((obj) => this.JoinListeners.add(obj));
		Modding.onListenerAdded<OnPlayerLeave>((obj) => this.LeaveListeners.add(obj));
		Modding.onListenerRemoved<OnPlayerLeave>((obj) => this.LeaveListeners.add(obj));

		for (const player of Players.GetPlayers())
			for (const listener of this.JoinListeners) task.spawn(() => listener.onPlayerJoin(player));

		Players.PlayerAdded.Connect((player) => {
			for (const listener of this.JoinListeners) task.spawn(() => listener.onPlayerJoin(player));
		});

		Players.PlayerRemoving.Connect((player) => {
			for (const listener of this.LeaveListeners) task.spawn(() => listener.onPlayerLeave(player));
		});
	}
}
