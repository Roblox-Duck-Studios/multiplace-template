import { InjectServerSync } from "common/server/deps";
import { Modding } from "@flamework/core";
import CharmSync from "@rbxts/charm-sync";
import { AtomsMap } from "shared/store";

Modding.registerDependency<InjectServerSync<typeof AtomsMap>>(() => {
	return CharmSync.server({ atoms: AtomsMap });
});
