import { BindingOrValue } from "@rbxts/pretty-react-hooks";
import React, { forwardRef, PropsWithChildren } from "@rbxts/react";
import { Corner } from "common/client/ui/components/primitive/corner";

interface CanvasGroupProps extends PropsWithChildren {
	/** The corner radius for the canvas group. */
	CornerRadius: BindingOrValue<number>;
	/** Whether the canvas group is visible. */
	Visible: BindingOrValue<boolean>;
}

/**
 * A wrapper around the `CanvasGroup` component, a GuiObject that renders
 * descendants as a group with color and transparency applied to the render
 * result.
 *
 * @example
 *
 * ```tsx
 * <CanvasGroup native={{ Size: new UDim2(0, 100, 0, 100) }}>
 * ```
 *
 * @component
 *
 * @see https://developer.roblox.com/en-us/api-reference/class/CanvasGroup
 */
const CanvasGroup = forwardRef(
	({ CornerRadius, Visible = true, children }: Readonly<CanvasGroupProps>, ref: React.Ref<CanvasGroup>) => {
		return (
			<canvasgroup
				ref={ref}
				AnchorPoint={new Vector2(0.5, 0.5)}
				BackgroundTransparency={1}
				BorderSizePixel={0}
				Position={new UDim2(0.5, 0, 0.5, 0)}
				Visible={Visible}
			>
				{CornerRadius ? <Corner Radius={CornerRadius} /> : undefined}
				{children}
			</canvasgroup>
		);
	},
);

export default CanvasGroup;
