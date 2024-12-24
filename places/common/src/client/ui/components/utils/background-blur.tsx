import { BindingOrValue, useBindingListener, useCamera } from "@rbxts/pretty-react-hooks";
import React, { useState } from "@rbxts/react";
import { createPortal } from "@rbxts/react-roblox";

interface BackgroundBlurProps {
	/** The size of the blur effect. */
	blurSize?: BindingOrValue<number>;
}

/**
 * Renders a background blur effect based on the provided `blurSize`.
 *
 * @param props - The component props.
 * @returns The rendered background blur component.
 */
export function BackgroundBlur({ blurSize }: Readonly<BackgroundBlurProps>): React.ReactNode {
	const camera = useCamera();
	const [visible, setVisible] = useState(false);

	useBindingListener(blurSize, (size = 0) => {
		setVisible(size > 0);
	});

	return createPortal(<>{visible ? <blureffect Size={blurSize} /> : undefined}</>, camera);
}
