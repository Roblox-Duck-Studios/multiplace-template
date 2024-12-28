import { DataStoreService, RunService } from "@rbxts/services";
import DataStoreServiceMock from "@rbxts/lapis-mockdatastore";
import { InjectDatastore } from "common/server/deps";
import { Modding } from "@flamework/core";

Modding.registerDependency<InjectDatastore>(() =>
	RunService.IsStudio() ? new DataStoreServiceMock() : DataStoreService,
);
