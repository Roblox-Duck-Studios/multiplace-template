/// <reference types="@rbxts/testez/globals" />

import { getPlayerSave, DeleteSave, PatchSave, saveAtom, SetSave } from "common/shared/store";
import { expect } from "@rbxts/expect";

function clean() {
	saveAtom(() => new ReadonlyMap());
}

export = () => {
	beforeEach(() => {
		clean();
	});
	describe("clean hook", () => {
		it("should empty table when called", () => {
			saveAtom(() => new ReadonlyMap([[-1, { RobuxSpent: 1 }]]));
			expect(saveAtom()).not.equal(new ReadonlyMap());
			clean();
			expect(saveAtom()).equal(new ReadonlyMap());
		});
	});
	describe("SetSave", () => {
		it("should create new entry", () => {
			SetSave(-1, { RobuxSpent: 0 });
			expect(saveAtom()).deepEqual(new ReadonlyMap([[-1, { RobuxSpent: 0 }]]));
		});
		it("should override previous entry", () => {
			SetSave(-1, { RobuxSpent: 0 });
			expect(saveAtom()).deepEqual(new ReadonlyMap([[-1, { RobuxSpent: 0 }]]));
			SetSave(-1, { RobuxSpent: 1 });
			expect(saveAtom()).deepEqual(new ReadonlyMap([[-1, { RobuxSpent: 1 }]]));
		});
	});
	describe("PatchSave", () => {
		it("should update entry", () => {
			SetSave(-1, { RobuxSpent: 0 });
			PatchSave(-1, { RobuxSpent: 1 });
			expect(saveAtom()).deepEqual(new ReadonlyMap([[-1, { RobuxSpent: 1 }]]));
		});
		it("should not create new entry if it doesn't exist", () => {
			PatchSave(-1, { RobuxSpent: 1 });
			PatchSave(-2, { RobuxSpent: 1 });
			PatchSave(-3, { RobuxSpent: 1 });
			expect(saveAtom()).be.deepEqual(new ReadonlyMap());
		});
		it("should not override entry", () => {
			SetSave(-1, { RobuxSpent: 1 });
			SetSave(-2, { RobuxSpent: 2 });
			PatchSave(-1, {});
			PatchSave(-2, {});
			expect(saveAtom()).to.be.deepEqual(
				new ReadonlyMap([
					[-1, { RobuxSpent: 1 }],
					[-2, { RobuxSpent: 2 }],
				]),
			);
		});
	});
	describe("DeleteSave", () => {
		it("should delete entry", () => {
			SetSave(-1, { RobuxSpent: 1 });
			SetSave(-2, { RobuxSpent: 1 });
			DeleteSave(-1);
			expect(saveAtom()).be.deepEqual(new ReadonlyMap([[-2, { RobuxSpent: 1 }]]));
			DeleteSave(-2);
			expect(saveAtom()).be.deepEqual(new ReadonlyMap());
		});
		it("should not error when deleting empty entry", () => {
			expect(() => {
				DeleteSave(-2);
			}).not.throw();
		});
	});
	describe("getPlayerSave", () => {
		it("should get player save", () => {
			SetSave(-2, { RobuxSpent: 1 });
			expect(getPlayerSave(-2)).to.not.be.empty();
		});
		it("should return empty when no entries entered", () => {
			expect(getPlayerSave(-2)).to.not.be.empty();
		});
	});
};
