import { createBinarySerializer } from "@rbxts/flamework-binary-serializer";
import { PlayerSave } from "common/types/player-save";

export const PlayerSerializer = createBinarySerializer<PlayerSave>();
