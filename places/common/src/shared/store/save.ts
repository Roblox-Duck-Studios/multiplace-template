import { PlayerSave } from "common/types/player-save";
import { produce } from "@rbxts/immut";
import { atom } from "@rbxts/charm";

export const saveAtom = atom(new ReadonlyMap<number, PlayerSave>());

export function SetSave(userid: number, data: PlayerSave) {
	saveAtom((state) =>
		produce(state, (draft) => {
			draft.set(userid, data);
		}),
	);
}

export function DeleteSave(userid: number) {
	saveAtom((state) =>
		produce(state, (draft) => {
			draft.delete(userid);
		}),
	);
}

export function PatchSave(userid: number, patch: Partial<PlayerSave>) {
	saveAtom((state) =>
		produce(state, (draft) => {
			const previous = draft.get(userid)!;
			draft.set(userid, { ...previous, ...patch! });
		}),
	);
}

export const selectPlayerSave = (userid: number) => () => saveAtom().get(userid);
