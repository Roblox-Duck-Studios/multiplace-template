import { ClientSyncer, AtomMap } from "@rbxts/charm-sync";
import { AddMarker } from "common/types/add-marker";

export type InjectClientSync<T extends AtomMap> = AddMarker<ClientSyncer<T>>;
