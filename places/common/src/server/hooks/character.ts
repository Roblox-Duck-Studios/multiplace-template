import { Modding, OnStart, Service } from "@flamework/core";

import { OnCharacterRemove, OnCharacterAdd, OnPlayerJoin } from ".";

@Service()
export default class CharacterAddService implements OnPlayerJoin, OnStart {
	private readonly removeListener = new Set<OnCharacterRemove>();
	private readonly addListener = new Set<OnCharacterAdd>();
	onStart(): void {
		Modding.onListenerAdded<OnCharacterAdd>((obj) => this.addListener.add(obj));
		Modding.onListenerRemoved<OnCharacterAdd>((obj) => this.addListener.delete(obj));
		Modding.onListenerAdded<OnCharacterRemove>((obj) => this.removeListener.add(obj));
		Modding.onListenerRemoved<OnCharacterRemove>((obj) => this.removeListener.delete(obj));
	}

	onPlayerJoin(player: Player): void {
		player.CharacterAdded.Connect((character) => this.characterAdded(character));
		player.CharacterRemoving.Connect((character) => {
			for (const listener of this.removeListener) listener.onCharacterRemove(character);
		});
		if (player.Character !== undefined) this.characterAdded(player.Character);
	}

	private async characterAdded(character: Model) {
		for (const listener of this.addListener) task.spawn(() => listener.onCharacterAdd(character));
	}
}
