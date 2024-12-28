import { OnPlayerLeave, OnPlayerJoin } from "common/server/hooks";
import { Service } from "@flamework/core";
import { Trove } from "@rbxts/trove";

@Service()
export class JunkService implements OnPlayerLeave, OnPlayerJoin {
	troveObjects = new Map<number, Trove>();

	onPlayerJoin(player: Player) {
		this.troveObjects.set(player.UserId, new Trove());
	}

	onPlayerLeave(player: Player) {
		this.troveObjects.get(player.UserId)?.clean();
		this.troveObjects.delete(player.UserId);
	}

	addJunk(player: Player, junk: Trove.Trackable) {
		this.troveObjects.get(player.UserId)?.add(junk);
	}

	clean(player: Player) {
		this.troveObjects.get(player.UserId)?.clean();
	}
}
