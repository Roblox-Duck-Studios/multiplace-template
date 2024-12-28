import { Flamework } from "@flamework/core";

const old = os.clock();

Flamework.addPaths("../common/src/client/controllers");
Flamework.addPaths("../common/src/client/hooks");
Flamework.addPaths("../common/src/client/deps");
Flamework.addPaths("../common/src/shared/deps");

Flamework.addPaths("src/client/controllers");
Flamework.addPaths("src/client/deps");
Flamework.addPaths("src/shared/deps");

Flamework.ignite();

print(`Initialized flamework client in ${os.clock() - old}`);
