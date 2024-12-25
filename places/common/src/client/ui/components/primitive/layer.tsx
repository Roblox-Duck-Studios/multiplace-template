import UltraWideContainer from "common/client/ui/components/utils/ultra-wide-container";
import Group from "common/client/ui/components/primitive/group";
import { IS_EDIT } from "common/shared/constants/game";
import React from "@rbxts/react";

export interface LayerProps extends React.PropsWithChildren {
	/**
	 * Whether or not to constraint ultra wide monitors to 16:9.
	 *
	 * @default true
	 */
	clampUltraWide?: boolean;
	/** The display order of the layer. */
	displayOrder?: number;
}

/**
 * Renders a collection of components under a screengui.
 *
 * If the game is running, the components are rendered under a `screengui`
 * object, otherwise they are rendered under a `Group` object while in edit mode
 * for storybook support.
 *
 * @example
 *
 * ```tsx
 * <Layer displayOrder={1}>
 * 	<TextButton Text="Button 1" />
 * 	<TextButton Text="Button 2" />
 * </Layer>;
 * ```
 *
 * @param props - The component props.
 * @returns The rendered Layer component.
 * @note By default, the `clampUltraWide` property is set to `true`. This means
 * that the layer will be constrained to a 16:9 aspect ratio on ultra wide
 * monitors. If you want to disable this behavior, set the property to `false`.
 *
 * @component
 *
 * @see https://developer.roblox.com/en-us/api-reference/class/ScreenGui
 */
export default function Layer({
	clampUltraWide = true,
	displayOrder,
	children,
}: Readonly<LayerProps>): React.ReactNode {
	return IS_EDIT ? (
		<Group>{clampUltraWide ? <UltraWideContainer>{children}</UltraWideContainer> : children}</Group>
	) : (
		<screengui DisplayOrder={displayOrder} ZIndexBehavior="Sibling" IgnoreGuiInset={true} ResetOnSpawn={false}>
			{clampUltraWide ? <UltraWideContainer>{children}</UltraWideContainer> : children}
		</screengui>
	);
}
