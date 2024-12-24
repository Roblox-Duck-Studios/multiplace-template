/**
 * creates a storybook group in
 * the file `index.storybook.ts`
 * to group ui components together
 * @param name Display name of the storybook. If not provided, the module name will be used
 * @param storyRoots Array of Instances where UI Labs will search for stories. Any subfolder will create a subfolder in UI Labs too.
 * @param groupRoots true, UI Labs will create subfolders for every entry in storyRoots @default true
 */
export function Storybook(name: string, storyRoots?: Array<Instance>, groupRoots = true) {
	return {
		name: name,
		storyRoots: storyRoots || getfenv(2).script.Parent?.GetChildren(),
		groupRoots: groupRoots,
	};
}
