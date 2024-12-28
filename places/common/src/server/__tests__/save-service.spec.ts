/// <reference types="@rbxts/testez/globals" />

import { getPlayerSave, PatchSave, saveAtom } from "common/shared/store";
import { DefaultData } from "common/server/constants/default-data";
import { SaveService } from "common/server/services/save-service";
import { JunkService } from "common/server/services/junk-service";
import DataStoreServiceMock from "@rbxts/lapis-mockdatastore";
import { MockPlayer } from "common/server/mocks/player";
import { PlayerSave } from "common/types/player-save";
import { expect } from "@rbxts/expect";

const saveService = new SaveService(new DataStoreServiceMock() as never, new JunkService());

export = () => {
	beforeEach(() => {
		saveAtom(() => new ReadonlyMap());
		saveService.documents = new Map();
	});

	describe("Internal Documents", () => {
		it("should create new document when player joins", async () => {
			expect(saveService.documents).to.be.empty();
			await saveService.onPlayerJoin(MockPlayer());
			expect(saveService.documents).not.be.empty();
		});
		it("should delete document when player leaves", async () => {
			const player = MockPlayer();
			await saveService.onPlayerJoin(player);
			expect(saveService.documents.size()).to.equal(1);
			await saveService.onPlayerLeave(player);
			expect(saveService.documents.size()).to.equal(0);
		});
		it("should handle multiple players joining and leaving", async () => {
			const player1 = MockPlayer(-1);
			const player2 = MockPlayer(-2);

			await saveService.onPlayerJoin(player1);
			await saveService.onPlayerJoin(player2);
			expect(saveService.documents.size()).to.equal(2);

			await saveService.onPlayerLeave(player1);
			expect(saveService.documents.size()).to.equal(1);

			await saveService.onPlayerLeave(player2);
			expect(saveService.documents.size()).to.equal(0);
		});
	});

	describe("Charm Integration", () => {
		it("should create new entry in saveAtom when player joins", async () => {
			await saveService.onPlayerJoin(MockPlayer(-1));
			expect(saveAtom()).to.not.be.empty();
			await saveService.onPlayerJoin(MockPlayer(-2));
			expect(saveAtom()).to.deepEqual(
				new ReadonlyMap<number, PlayerSave>([
					[-1, DefaultData],
					[-2, DefaultData],
				]),
			);
		});
		it("should delete entry when player leaves", async () => {
			await saveService.onPlayerJoin(MockPlayer(-1));
			expect(saveAtom()).to.not.be.empty();
			await saveService.onPlayerLeave(MockPlayer(-1));
			expect(saveAtom()).to.be.empty();

			await saveService.onPlayerJoin(MockPlayer(-1));
			await saveService.onPlayerJoin(MockPlayer(-2));

			await saveService.onPlayerLeave(MockPlayer(-1));
			expect(saveAtom()).to.not.be.empty();

			await saveService.onPlayerLeave(MockPlayer(-2));
			expect(saveAtom()).to.be.empty();
		});
		it("can use saveAtom selectors", async () => {
			await saveService.onPlayerJoin(MockPlayer(-1));
			expect(getPlayerSave(-1)).to.not.empty();
		});
		it("updates when charm atom changes", async () => {
			await saveService.onPlayerJoin(MockPlayer());
			PatchSave(-1, { RobuxSpent: 999 });
			expect(saveService.documents.get(-1)?.read()).to.equal({ RobuxSpent: 999 });
		});
	});

	describe("SaveService methods", () => {
		it("saveDocument should automatically write with saveAtom", async () => {
			await saveService.onPlayerJoin(MockPlayer(-1));
			PatchSave(-1, { RobuxSpent: 1000 });
			await saveService.writeDocument(MockPlayer(-1));
			expect(saveService.documents.get(-1)?.read()).to.equal({ RobuxSpent: 1000 });
		});

		it("writeDocument should write changes with saveAtom", async () => {
			await saveService.onPlayerJoin(MockPlayer(-1));
			PatchSave(-1, { RobuxSpent: 1000 });
			await saveService.writeDocument(MockPlayer(-1));
			expect(saveService.documents.get(-1)?.read()).to.equal({ RobuxSpent: 1000 });
		});
	});
};
