import { atom } from "@rbxts/charm";
import Remap from "@rbxts/remap";
import { push } from "@rbxts/sift/out/Array";
import { IsoDate } from "common/types/utils/roblox";

export const saveAtom = atom(new ReadonlyMap<number, PlayerSave>());

export function SetSave(userid: number, data: PlayerSave) {
	saveAtom((state) => Remap.set(state, userid, data));
}

export function DeleteSave(userid: number) {
	saveAtom((state) => Remap.delete(state, userid));
}

export function PatchSave(userid: number, patch: Partial<PlayerSave>) {
	saveAtom((state) => Remap.update(state, userid, (value) => ({ ...value!, ...patch })));
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

export interface PlayerSave {
	purchaseHistory: Array<PurchaseInfo>;
}

export const DefaultPlayerSave: PlayerSave = {
	purchaseHistory: new Array(),
};

export interface PurchaseInfo {
	purchaseid: string;
	robux: number;
	timestamp: IsoDate | string;
}
