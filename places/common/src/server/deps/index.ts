import { ServerSyncer, AtomMap } from "@rbxts/charm-sync";
import { AddMarker } from "common/types/add-marker";

export type InjectDatastore = AddMarker<DataStoreService>;
export type InjectServerSync<T extends AtomMap> = AddMarker<ServerSyncer<T>>;
