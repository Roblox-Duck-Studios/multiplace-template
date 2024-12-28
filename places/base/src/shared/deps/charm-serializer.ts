import { createBinarySerializer } from "@rbxts/flamework-binary-serializer";
import { SerializeablePayload } from "@rbxts/charm-payload-converter";
import { InjectCharmSerializer } from "common/shared/deps";
import { Modding } from "@flamework/core";
import { AtomsMap } from "shared/store";

Modding.registerDependency<InjectCharmSerializer>(() => {
	return createBinarySerializer<SerializeablePayload<typeof AtomsMap>>();
});
