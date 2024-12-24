import { getBindingValue, useEventListener, useMotion } from "@rbxts/pretty-react-hooks";
import { Binding, useRef } from "@rbxts/react";
import { MotionGoal, SpringOptions } from "@rbxts/ripple";
import { RunService } from "@rbxts/services";

export function useSpring(goal: number | Binding<number>, options?: SpringOptions): Binding<number>;

export function useSpring<T extends MotionGoal>(goal: T | Binding<T>, options?: SpringOptions): Binding<T>;

export function useSpring(goal: MotionGoal | Binding<MotionGoal>, options?: SpringOptions) {
	const [binding, motion] = useMotion(getBindingValue(goal));
	const previousValue = useRef(getBindingValue(goal));

	useEventListener(RunService.Heartbeat, () => {
		const currentValue = getBindingValue(goal);

		if (currentValue !== previousValue.current) {
			previousValue.current = currentValue;
			motion.spring(currentValue, options);
		}
	});

	return binding;
}
