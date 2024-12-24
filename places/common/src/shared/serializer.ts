import { createBinarySerializer } from "@rbxts/flamework-binary-serializer";
import { PlayerSave } from "common/shared/store";

export const PlayerSerializer = createBinarySerializer<PlayerSave>();
