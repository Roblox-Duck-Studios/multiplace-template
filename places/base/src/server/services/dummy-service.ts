import { OnStart, Service } from "@flamework/core";

/** a dummy service because darklua deletes everything */
@Service()
export class DummyService implements OnStart {
	onStart(): void {
		print("hello world");
	}
}
