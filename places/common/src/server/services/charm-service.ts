import { toSerializeablePayload } from "@rbxts/charm-payload-converter";
import { InjectCharmSerializer } from "common/shared/deps";
import { CharmRemotes } from "common/shared/remotes/charm";
import { InjectServerSync } from "common/server/deps";
import { OnStart, Service } from "@flamework/core";

@Service()
export class CharmService implements OnStart {
	constructor(
		private sync: InjectServerSync<defined>,
		private serializer: InjectCharmSerializer,
	) {}

	onStart() {
		this.sync.connect((player, payload) => {
			const { buffer, blobs } = this.serializer.serialize(toSerializeablePayload(payload));
			CharmRemotes.dispatch.fire(player, buffer, blobs);
		});

		CharmRemotes.init.connect((player) => {
			this.sync.hydrate(player);
		});
	}
}
