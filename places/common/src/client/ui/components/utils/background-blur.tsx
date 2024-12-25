import { useBindingListener, BindingOrValue, useCamera } from "@rbxts/pretty-react-hooks";
import { createPortal } from "@rbxts/react-roblox";
import React, { useState } from "@rbxts/react";

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
