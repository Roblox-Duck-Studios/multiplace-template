import { ScalerContext } from "common/client/ui/context/scaler-context";
import { useContext } from "@rbxts/react";

export function useScale() {
	const context = useContext(ScalerContext);
	assert(context, "ScalerContext not found. Did you call it outside of ScalerContext?");
	return context;
}
