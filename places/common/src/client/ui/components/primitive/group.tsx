import React, { forwardRef } from "@rbxts/react";

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface GroupProps extends React.PropsWithChildren {}

const Group = forwardRef(({ children }: Readonly<GroupProps>, ref: React.Ref<Frame>) => {
	return (
		<frame
			ref={ref}
			AnchorPoint={new Vector2(0.5, 0.5)}
			BackgroundTransparency={1}
			Position={new UDim2(0.5, 0, 0.5, 0)}
			Size={new UDim2(1, 0, 1, 0)}
		>
			{children}
		</frame>
	);
});

export default Group;
