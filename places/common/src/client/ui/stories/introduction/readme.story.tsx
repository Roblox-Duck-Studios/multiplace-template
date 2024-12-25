import { ScaleProvider } from "common/client/ui/provider/scale-provider";
import { Corner } from "common/client/ui/components/primitive/corner";
import React, { PropsWithChildren } from "@rbxts/react";
import { usePx } from "common/client/ui/hooks/use-px";
import { CreateReactStory } from "@rbxts/ui-labs";
import ReactRoblox from "@rbxts/react-roblox";

/** its a good practice to have
 * `PropsWithChildren`, but it
 * isn't required. I made up this
 * "good practice" because roblox-ts
 */
interface ReadmeProps extends PropsWithChildren {
	/** the text to display */
	text?: string;
}
/** We create a react component */
function Component({ text }: ReadmeProps) {
	const scaler = usePx();
	return (
		<textlabel
			Size={scaler.udim2(1920 * 0.9, 1080 * 0.9)}
			Position={UDim2.fromScale(0.5, 0.5)}
			AnchorPoint={new Vector2(0.5, 0.5)}
			Text={text}
		>
			<Corner Radius={8} />
		</textlabel>
	);
}

/** You MUST use export = CreateReact story instead of
 * directly exporting the function, because of how
 * compiler compiles code
 */
export = CreateReactStory({ reactRoblox: ReactRoblox, react: React }, () => {
	return (
		<ScaleProvider>
			<Component text="This is a README file, because of the framework we are using. Please view the UI device set as HD 1080 or the dimensions as 1920x1080 " />
		</ScaleProvider>
	);
});
