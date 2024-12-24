import Make from "@rbxts/make";
import { useMountEffect } from "@rbxts/pretty-react-hooks";
import React, { useRef } from "@rbxts/react";

export interface ObjectViewportProps extends React.PropsWithChildren {
	/** Additional depth to push the camera back. */
	extraCameraDepth?: number;
	/** The native props to a viewport. */
	native: React.InstanceProps<ViewportFrame>;
	/** The object to be displayed in the viewport. */
	object: BasePart | Model;
}

function setDefaultCameraView(camera: Camera, model: Model, cameraDepth = 0): void {
	const [modelCF] = model.GetBoundingBox();

	const radius = model.GetExtentsSize().Magnitude / 2;
	const halfFov = math.rad(camera.FieldOfView) / 2;
	const depth = radius / math.tan(halfFov) + cameraDepth;

	// 1. Remove translation
	// 2. Move to model position
	// 3. Push camera back by depth in the original angle given
	camera.CFrame = camera.CFrame.sub(camera.CFrame.Position)
		.add(modelCF.Position)
		.add(camera.CFrame.Position.sub(modelCF.Position).Unit.mul(depth));
}

/**
 * Renders a viewport for displaying an object.
 *
 * @example
 *
 * ```tsx
 * <objectViewport
 * 	native={{ Size: new UDim2(1, 0, 1, 0) }}
 * 	object={new Part()}
 * />;
 * ```
 *
 * @param props - The object viewport component props.
 * @returns The rendered viewport.
 * @component
 */
export default function ObjectViewport({
	extraCameraDepth,
	native,
	object,
	children,
}: Readonly<ObjectViewportProps>): React.ReactNode {
	// Setup the viewport after mounting when we have a ref to it
	const viewportRef = useRef<ViewportFrame>();

	useMountEffect(() => {
		const viewport = viewportRef.current;
		assert(viewport !== undefined, "Viewport is not defined");

		let model = object;
		if (!model.IsA("Model")) {
			model = Make("Model", {
				Children: [object],
				PrimaryPart: object as BasePart,
			});
		}

		model.Parent = viewport;

		const viewportCamera = new Instance("Camera");
		viewport.CurrentCamera = viewportCamera;
		setDefaultCameraView(viewportCamera, model, extraCameraDepth);
		viewportCamera.Parent = viewport;
	});

	return (
		<viewportframe ref={viewportRef} {...native}>
			{children}
		</viewportframe>
	);
}
