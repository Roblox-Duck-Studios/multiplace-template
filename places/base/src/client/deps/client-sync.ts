import { InjectClientSync } from "common/client/deps";
import { Modding } from "@flamework/core";
import CharmSync from "@rbxts/charm-sync";
import { AtomsMap } from "shared/store";

Modding.registerDependency<InjectClientSync<typeof AtomsMap>>(() => {
	return CharmSync.client({ atoms: AtomsMap });
});
