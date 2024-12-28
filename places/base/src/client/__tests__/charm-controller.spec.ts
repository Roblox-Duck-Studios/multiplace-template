/// <reference types="@rbxts/testez/globals" />

import { createBinarySerializer } from "@rbxts/flamework-binary-serializer";
import { InjectCharmSerializer } from "common/shared/deps";
import { InjectClientSync } from "common/client/deps";
import CharmSync from "@rbxts/charm-sync";
import Object from "@rbxts/object-utils";
import { AtomsMap } from "shared/store";

const charmSerializer = createBinarySerializer<typeof AtomsMap>() as unknown as InjectCharmSerializer;
let sync = CharmSync.client({ atoms: AtomsMap }) as InjectClientSync<typeof AtomsMap>;

function refresh() {
	const atomsMap = Object.deepCopy(AtomsMap);
	sync = CharmSync.client({ atoms: atomsMap }) as InjectClientSync<typeof AtomsMap>;
}

export = () => {
	beforeEach(() => {
		refresh();
	});
	//TODO: write unit tests here
};
