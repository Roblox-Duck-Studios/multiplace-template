export interface OnCharacterAdd {
	onCharacterAdd(character: Model): void;
}

export interface OnCharacterRemove {
	onCharacterRemove(character: Model): void;
}

export * from "./character";
