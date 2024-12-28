/** A fake player used for testing */
export function MockPlayer(userId = -1): Player {
	return { ClassName: "Player", UserId: userId } as Player;
}
