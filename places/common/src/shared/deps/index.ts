import { SerializeablePayload } from "@rbxts/charm-payload-converter";
import { Serializer } from "@rbxts/flamework-binary-serializer";
import { AddMarker } from "common/types/add-marker";

export type InjectCharmSerializer = AddMarker<Serializer<SerializeablePayload<CharmSync.AtomMap>>>;
