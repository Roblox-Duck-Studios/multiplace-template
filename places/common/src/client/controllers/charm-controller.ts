import { fromSerializeablePayload } from "@rbxts/charm-payload-converter";
import { InjectCharmSerializer } from "common/shared/deps";
import { CharmRemotes } from "common/shared/remotes/charm";
import { InjectClientSync } from "common/client/deps";
import { OnStart } from "@flamework/core";

export class CharmController implements OnStart {
	constructor(
		private sync: InjectClientSync<defined>,
		private serializer: InjectCharmSerializer,
	) {}

	onStart() {
		CharmRemotes.dispatch.connect((buffer, blobs) => {
			const deserialized = this.serializer.deserialize(buffer, blobs);
			const hydration = fromSerializeablePayload(deserialized);
			this.sync.sync(hydration);
		});

		CharmRemotes.init.fire();
	}
}
