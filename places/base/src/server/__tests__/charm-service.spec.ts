/// <reference types="@rbxts/testez/globals" />

import { createBinarySerializer } from "@rbxts/flamework-binary-serializer";
import { CharmService } from "common/server/services/charm-service";
import { InjectCharmSerializer } from "common/shared/deps";
import { CharmRemotes } from "common/shared/remotes/charm";
import { MockPlayer } from "common/server/mocks/player";
import { InjectServerSync } from "common/server/deps";
import CharmSync from "@rbxts/charm-sync";
import Object from "@rbxts/object-utils";
import { AtomsMap } from "shared/store";
import { expect } from "@rbxts/expect";

const atomsMap = Object.deepCopy(AtomsMap);
let sync = CharmSync.server({ atoms: atomsMap }) as InjectServerSync<typeof AtomsMap>;
const charmSerializer = createBinarySerializer<typeof AtomsMap>() as unknown as InjectCharmSerializer;

function refresh() {
	const atomsMap = Object.deepCopy(AtomsMap);
	sync = CharmSync.server({ atoms: atomsMap }) as InjectServerSync<typeof AtomsMap>;
}

export = () => {
	beforeEach(() => {
		refresh();
	});
	it("should compress into buffer and blobs", () => {
		const charmService = new CharmService(sync, charmSerializer);
		charmService.onStart();
		CharmRemotes.dispatch.test.onFire((buffer, blobs) => {
			expect(buffer).to.be.typeOf("buffer");
			expect(blobs).to.be.table();
		});
		sync.hydrate(MockPlayer());
	});
	//TODO: write more tests
};
