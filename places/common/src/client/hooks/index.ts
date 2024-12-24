export interface OnCharacterAdd {
	onCharacterAdd(character: Character): void;
}

export interface OnCharacterRemove {
	onCharacterRemove(character: Character): void;
}

export * from "./character";
