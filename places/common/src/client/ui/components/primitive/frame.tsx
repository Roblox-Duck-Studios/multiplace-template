import type { PropsWithChildren, Ref } from "@rbxts/react";

import { BindingOrValue } from "@rbxts/pretty-react-hooks";
import React, { forwardRef } from "@rbxts/react";

interface FrameProps extends PropsWithChildren {
	/** An optional helper that rounds the corners of the frame. */
	CornerRadius?: BindingOrValue<UDim>;
	/** The default properties of the component. */
}

/**
 * A wrapper around the `Frame` component, a GuiObject that renders as a plain
 * rectangle with no other content. If you intend to use this component as a
 * container for other components, consider using the `Group` component
 * instead.
 *
 * @example
 *
 * ```tsx
 * <Frame cornerRadius={new UDim(0, 8)} native={{ Size: new UDim2(0, 100, 0, 100) }}>
 * ```
 *
 * @note A frame defaults to being centered in the parent container (anchor point and
 * position are set to 0.5).
 *
 * @component
 *
 * @see https://create.roblox.com/docs/reference/engine/classes/Frame
 */
const Frame = forwardRef(({ CornerRadius, children }: Readonly<FrameProps>, ref: Ref<Frame>) => {
	return (
		<frame
			Position={new UDim2(0.5, 0, 0.5, 0)}
			AnchorPoint={new Vector2(0.5, 0.5)}
			Size={new UDim2(1, 0, 1, 0)}
			BorderSizePixel={0}
			ref={ref}
		>
			{children}
			{CornerRadius ? <uicorner CornerRadius={CornerRadius} /> : undefined}
		</frame>
	);
});

export default Frame;
