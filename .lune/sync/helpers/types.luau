--TODO: put every customly defined type here
export type MockInstance = { ClassName: string, Children: { MockInstance } }
export type ProjectTree = { tree: InstanceTree, name: string }
export type InstanceTree =
	{ ["$className"]: string?, ["$path"]: string?, ["$properties"]: { [string]: any }? }
	& { [string]: InstanceTree }
export type Metadata = { className: string?, properties: { [string]: any } }
return nil
