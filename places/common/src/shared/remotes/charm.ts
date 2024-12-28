import { createRemotes, Client, remote, Server } from "@rbxts/remo";
import { t } from "@rbxts/t";

export const CharmRemotes = createRemotes({
	dispatch: remote<Client, [buffer: buffer, blobs: defined[]]>(t.buffer, t.array(t.any)),
	init: remote<Server>(),
});
