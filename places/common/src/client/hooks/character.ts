import { Controller, Modding, OnStart } from "@flamework/core";
import { Players } from "@rbxts/services";

import { OnCharacterRemove, OnCharacterAdd } from ".";

@Controller({ loadOrder: 1 })
export class CharacterAddController implements OnStart {
	private readonly removeListener = new Set<OnCharacterRemove>();
	private readonly addListener = new Set<OnCharacterAdd>();
	onStart(): void {
		Modding.onListenerAdded<OnCharacterAdd>((obj) => this.addListener.add(obj));
		Modding.onListenerRemoved<OnCharacterAdd>((obj) => this.addListener.delete(obj));
		Modding.onListenerAdded<OnCharacterRemove>((obj) => this.removeListener.add(obj));
		Modding.onListenerRemoved<OnCharacterRemove>((obj) => this.removeListener.delete(obj));
		Players.LocalPlayer.CharacterAdded.Connect((character) => {
			for (const listener of this.addListener) listener.onCharacterAdd(character as Model);
		});
		Players.LocalPlayer.CharacterRemoving.Connect((character) => {
			for (const listener of this.removeListener) listener.onCharacterRemove(character as Model);
		});
		if (Players.LocalPlayer.Character)
			for (const listener of this.addListener) listener.onCharacterAdd(Players.LocalPlayer.Character! as Model);
	}
}
