import { useScale } from "common/client/ui/hooks/use-scale";
/**
 * @warn please use `ScalerContext` to make this work
 */
export function usePx() {
	return useScale().usePx();
}
