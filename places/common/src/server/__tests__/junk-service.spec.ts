/// <reference types="@rbxts/testez/globals" />

import { JunkService } from "common/server/services/junk-service";
import { MockPlayer } from "common/server/mocks/player";
import Signal from "@rbxts/lemon-signal";
import { expect } from "@rbxts/expect";

const junkService = new JunkService();

export = () => {
	beforeEach(() => {
		junkService.troveObjects = new Map();
	});

	describe("player handling", () => {
		it("should create a trove object when player joins", () => {
			junkService.onPlayerJoin(MockPlayer(-1));
			junkService.onPlayerJoin(MockPlayer(-2));
			expect(junkService.troveObjects).not.be.empty();
		});
		it("should clean and remove when player leaves", () => {
			junkService.onPlayerJoin(MockPlayer(-2));
			junkService.onPlayerLeave(MockPlayer(-2));
			expect(junkService.troveObjects).to.be.empty();
		});
	});

	describe("trove object", () => {
		it("should able to add connection object", () => {
			let called = false;
			const signal = new Signal();
			const player = MockPlayer();
			junkService.onPlayerJoin(player);
			junkService.addJunk(
				player,
				signal.Connect(() => (called = true)),
			);
			signal.Fire();
			expect(called).to.be.true();
		});
		it("should disconnect the connection when cleaned", () => {
			let called = false;
			const signal = new Signal();
			const player = MockPlayer();
			junkService.onPlayerJoin(player);
			junkService.addJunk(
				player,
				signal.Connect(() => (called = true)),
			);
			junkService.clean(player);
			signal.Fire();
			expect(called).to.be.false();
		});
	});
};
