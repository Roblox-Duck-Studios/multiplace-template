import React, { PropsWithChildren, forwardRef } from "@rbxts/react";
import { BindingOrValue } from "@rbxts/pretty-react-hooks";

export interface ImageProps extends PropsWithChildren {
	/** Optional corner radius */
	CornerRadius?: BindingOrValue<UDim>;
	/** The image to display. */
	Image: BindingOrValue<string>;
}

/**
 * A component for displaying an image.
 *
 * @example
 *
 * ```tsx
 * <ImageLabel
 * 	Image="rbxassetid://1234567890"
 * 	native={{
 * 		Size={new UDim2(0, 100, 0, 100)}
 * 	}}
 * />;
 * ```
 *
 * @component
 *
 * @see https://developer.roblox.com/en-us/api-reference/class/ImageLabel
 */
const Image = forwardRef(({ CornerRadius, children, Image }: ImageProps, ref: React.Ref<ImageLabel>) => {
	return (
		<imagelabel
			Position={new UDim2(0.5, 0, 0.5, 0)}
			AnchorPoint={new Vector2(0.5, 0.5)}
			Size={new UDim2(1, 0, 1, 0)}
			BackgroundTransparency={1}
			Image={Image}
			ref={ref}
		>
			{CornerRadius ? <uicorner CornerRadius={CornerRadius} /> : undefined}
			{children}
		</imagelabel>
	);
});

export default Image;
