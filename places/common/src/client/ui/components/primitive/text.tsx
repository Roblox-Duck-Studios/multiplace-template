import type { Ref } from "@rbxts/react";

import { BindingOrValue } from "@rbxts/pretty-react-hooks";
import React, { forwardRef } from "@rbxts/react";

export interface TextProps<T extends Instance = TextLabel> extends React.PropsWithChildren {
	/** The default properties of the component. */
	readonly native?: Partial<React.InstanceProps<T>>;
	/** An optional helper that rounds the corners of the text. */
	readonly cornerRadius?: BindingOrValue<UDim>;
}

/**
 * A wrapper around the `Text` component, a GuiObject that renders as a plain
 * rectangle with no other content. If you intend to use this component as a
 * container for other components, consider using the `Group` component
 * instead.
 *
 * @example
 *
 * ```tsx
 * <Text cornerRadius={new UDim(0, 8)} native={{ Size: new UDim2(0, 100, 0, 100) }}>
 * ```
 *
 * @note A Text defaults to being centered in the parent container (anchor point and
 * position are set to 0.5).
 *
 * @component
 *
 * @see https://create.roblox.com/docs/reference/engine/classes/textlabel
 */
export const Text = forwardRef(({ cornerRadius, children, native }: TextProps, ref: Ref<TextLabel>) => {
	const { AnchorPoint, Position } = native ?? {};

	return (
		<textlabel
			ref={ref}
			{...native}
			AnchorPoint={AnchorPoint ?? new Vector2(0.5, 0.5)}
			Position={Position ?? new UDim2(0.5, 0, 0.5, 0)}
			BorderSizePixel={0}
		>
			{children}
			{cornerRadius ? <uicorner CornerRadius={cornerRadius} /> : undefined}
		</textlabel>
	);
});

export default Text;
