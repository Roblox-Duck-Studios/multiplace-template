type Migrate<T> = (data: unknown) => T;
type Migration<T = unknown> = { backwardsCompatible?: boolean; migrate: Migrate<T> } | Migrate<T>;

export type Migrations<T extends defined> = [...Array<Migration>, Migration<T>];
