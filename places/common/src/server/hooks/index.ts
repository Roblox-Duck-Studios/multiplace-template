export interface OnPlayerLeave {
	onPlayerLeave(player: Player): void;
}

export interface OnPlayerJoin {
	onPlayerJoin(player: Player): void;
}

export interface OnCharacterAdd {
	onCharacterAdd(character: Model): void;
}

export interface OnCharacterRemove {
	onCharacterRemove(character: Model): void;
}
