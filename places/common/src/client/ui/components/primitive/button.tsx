import { getBindingValue, BindingOrValue } from "@rbxts/pretty-react-hooks";
import React, { PropsWithChildren, forwardRef, Ref } from "@rbxts/react";
import { usePx } from "common/client/ui/hooks/use-px";

interface ButtonProps extends PropsWithChildren {
	/** The background color of the text */
	BackgroundColor: BindingOrValue<Color3>;
	/**The corner radius */
	CornerRadius: BindingOrValue<number>;
	/** The color of the text */
	TextColor: BindingOrValue<Color3>;
	/** The position of the button */
	Position: BindingOrValue<UDim2>;
	/** The size of the button */
	Size: BindingOrValue<UDim2>;
	/** A callback that is triggered when the mouse enters the button. */
	onMouseEnter?: () => void;
	/** A callback that is triggered when the mouse leaves the button. */
	onMouseLeave?: () => void;
	/**
	 * A callback that is triggered when the mouse button is pressed down on the
	 * button.
	 */
	onMouseDown?: () => void;
	/**
	 * A callback that is triggered when the mouse button is released on the
	 * button.
	 */
	onMouseUp?: () => void;
	/** A callback that is triggered when the button is clicked. */
	onClick?: () => void;
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
			onMouseEnter,
			onMouseLeave,
			onMouseDown,
			TextColor,
			onMouseUp,
			children,
			onClick,
		}: Readonly<Partial<ButtonProps>>,
		ref: Ref<TextButton>,
	) => {
		const scale = usePx();
		return (
			<textbutton
				Event={{
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
					Activated: () => {
						onClick?.();
					},
				}}
				Position={new UDim2(0.5, 0, 0.5, 0)}
				AnchorPoint={new Vector2(0.5, 0.5)}
				BackgroundColor3={BackgroundColor}
				AutoButtonColor={false}
				TextColor3={TextColor}
				BorderSizePixel={0}
				ref={ref}
				Text=""
			>
				{CornerRadius ? <uicorner CornerRadius={scale.udim(getBindingValue(CornerRadius))} /> : undefined}
				{children}
			</textbutton>
		);
	},
);
