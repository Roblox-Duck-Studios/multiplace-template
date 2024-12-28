import { getPlayerSave, DeleteSave, saveAtom, SetSave } from "common/shared/store";
import { createCollection, Collection, setConfig, Document } from "@rbxts/lapis";
import { DefaultData } from "common/server/constants/default-data";
import { OnPlayerLeave, OnPlayerJoin } from "common/server/hooks";
import { JunkService } from "common/server/services/junk-service";
import { PlayerSave } from "common/types/player-save";
import { InjectDatastore } from "common/server/deps";
import { Flamework, Service } from "@flamework/core";
import { subscribe } from "@rbxts/charm";

@Service()
export class SaveService implements OnPlayerLeave, OnPlayerJoin {
	constructor(
		private datastoreService: InjectDatastore,
		private junkService: JunkService,
	) {
		setConfig({ dataStoreService: this.datastoreService });

		this.collection = createCollection("PlayerSave", {
			validate: Flamework.createGuard<PlayerSave>(),
			defaultData: DefaultData,
		});
	}

	public documents = new Map<number, Document<PlayerSave>>();

	private readonly collection: Collection<PlayerSave>;

	async onPlayerJoin(player: Player) {
		const userId = player.UserId;
		const document = await this.collection.load(tostring(userId), [userId]);
		this.documents.set(userId, document);
		SetSave(userId, document.read());
		document.beforeClose(async () => {
			await this.writeDocument(player);
			this.documents.delete(userId);
			DeleteSave(userId);
		});

		this.junkService.addJunk(
			player,
			subscribe(saveAtom, (data) => {
				this.documents.get(userId)?.write(data.get(userId)!);
			}),
		);
	}

	async onPlayerLeave(player: Player) {
		await this.writeDocument(player);
		this.documents.get(player.UserId)?.close();
	}

	async saveDocument(player: Player) {
		await this.writeDocument(player);
		this.documents.get(player.UserId)?.save();
	}

	async writeDocument(player: Player) {
		const playerSave = getPlayerSave(player.UserId)!;
		this.documents.get(player.UserId)?.write(playerSave);
	}
}
