import { BindingOrValue, getBindingValue } from "@rbxts/pretty-react-hooks";
import React, { forwardRef, PropsWithChildren, Ref } from "@rbxts/react";
import { usePx } from "common/client/ui/hooks/use-px";

interface ButtonProps extends PropsWithChildren {
	/** A callback that is triggered when the button is clicked. */
	onClick?: () => void;
	/**
	 * A callback that is triggered when the mouse button is pressed down on the
	 * button.
	 */
	onMouseDown?: () => void;
	/** A callback that is triggered when the mouse enters the button. */
	onMouseEnter?: () => void;
	/** A callback that is triggered when the mouse leaves the button. */
	onMouseLeave?: () => void;
	/**
	 * A callback that is triggered when the mouse button is released on the
	 * button.
	 */
	onMouseUp?: () => void;
	/** The color of the text */
	TextColor: BindingOrValue<Color3>;
	/** The background color of the text */
	BackgroundColor: BindingOrValue<Color3>;
	/**The corner radius */
	CornerRadius: BindingOrValue<number>;
	/** The position of the button */
	Position: BindingOrValue<UDim2>;
	/** The size of the button */
	Size: BindingOrValue<UDim2>;
	/** The transparency of the button */
	Transparency: number;
}

/**
 * Button component.
 *
 * @example
 *
 * ```tsx
 * <Button
 * 	cornerRadius={new UDim(0, 8)}
 * 	native={{ Size: new UDim2(0, 100, 0, 100) }}
 * 	onClick={useCallback(() => {
 * 		print("Hello World!");
 * 	}, [])}
 * />;
 * ```
 *
 * Button is released on the button.
 *
 * @param buttonProps - The properties of the Button component.
 * @returns The rendered Button component.
 * @component
 *
 * @see https://create.roblox.com/docs/reference/engine/classes/TextButton
 */
export const Button = forwardRef(
	(
		{
			BackgroundColor,
			CornerRadius,
			TextColor,
			children,
			onClick,
			onMouseDown,
			onMouseEnter,
			onMouseLeave,
			onMouseUp,
		}: Readonly<Partial<ButtonProps>>,
		ref: Ref<TextButton>,
	) => {
		const scale = usePx();
		return (
			<textbutton
				BorderSizePixel={0}
				AnchorPoint={new Vector2(0.5, 0.5)}
				ref={ref}
				Event={{
					Activated: () => {
						onClick?.();
					},
					MouseButton1Down: () => {
						onMouseDown?.();
					},
					MouseButton1Up: () => {
						onMouseUp?.();
					},
					MouseEnter: () => {
						onMouseEnter?.();
					},
					MouseLeave: () => {
						onMouseLeave?.();
					},
				}}
				Position={new UDim2(0.5, 0, 0.5, 0)}
				AutoButtonColor={false}
				Text=""
				BackgroundColor3={BackgroundColor}
				TextColor3={TextColor}
			>
				{CornerRadius ? <uicorner CornerRadius={scale.udim(getBindingValue(CornerRadius))} /> : undefined}
				{children}
			</textbutton>
		);
	},
);
