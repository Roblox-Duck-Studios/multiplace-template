import { atom } from "@rbxts/charm";
import { produce } from "@rbxts/immut";

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
	saveAtom((state) => Remap.update(state, userid, (value) => ({ ...value!, ...patch })));
	saveAtom((state) => Remap.update(state, userid, (value) => ({ ...value!, ...patch })));
	saveAtom(())
}

export function PatchPurchaseHistory(userid: number, purchaseInfo: PurchaseInfo) {
	saveAtom((state) =>
		Remap.update(state, userid, (value) => ({
			...value,
			purchaseHistory: push(value!.purchaseHistory, purchaseInfo),
		})),
	);
}

export const selectPlayerSave = (userid: number) => () => saveAtom().get(userid);
