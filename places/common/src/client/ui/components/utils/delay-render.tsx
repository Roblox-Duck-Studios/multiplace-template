import React, { useEffect, useState } from "@rbxts/react";
import { setTimeout } from "@rbxts/set-timeout";

interface DelayRenderProps extends React.PropsWithChildren {
	/**
	 * Indicates whether the children component should be rendered. If true, the
	 * children component will be rendered after the mountDelay. If false, the
	 * children component will be unmounted after the unmountDelay.
	 */
	shouldRender: boolean;
	/** The delay (in seconds) before unmounting the children component. */
	unmountDelay?: number;
	/** The delay (in seconds) before rendering the children component. */
	mountDelay?: number;
}

/**
 * Renders the children component with a delay based on the provided mountDelay
 * and unmountDelay values.
 *
 * This component can be useful for creating transitions or animations when
 * rendering or unmounting components, e.g, playing a fade-out animation before
 * unmounting a component.
 *
 * @example
 *
 * ```tsx
 * <DelayRender shouldRender={true} unmountDelay={1}>
 * 	<Text Text={"Hello World!"} />
 * </DelayRender>;
 * ```
 *
 * @param delayRenderProps - The properties of delay-render props.
 * @returns - The rendered children component.
 * @component
 */
export function DelayRender({
	unmountDelay = 0,
	mountDelay = 0,
	shouldRender,
	children,
}: Readonly<DelayRenderProps>): React.ReactNode {
	const [render, setRender] = useState(false);

	useEffect(() => {
		const delay = shouldRender ? mountDelay : unmountDelay;
		return setTimeout(() => {
			setRender(shouldRender);
		}, delay);
	}, [mountDelay, shouldRender, unmountDelay]);

	return <>{render ? children : undefined}</>;
}
