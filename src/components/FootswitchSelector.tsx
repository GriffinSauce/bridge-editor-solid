import { Component } from "solid-js";
import { device } from "../services/device";
import { setState, state } from "../store";

export const FootswitchSelector: Component = () => {
	const {
		hardware: { footswitches },
	} = device()!.getDeviceDescription();

	return (
		<div
			class={`grid gap-3 w-48 ${
				footswitches === 6 ? "grid-cols-3" : "grid-cols-2"
			}`}
		>
			{Array(footswitches)
				.fill(undefined)
				.map((_, index) => index + 1)
				.sort((a, b) => {
					// Sort top row to top
					const aTop = a > footswitches / 2;
					const bTop = b > footswitches / 2;
					if (aTop === bTop) return 0;
					return -1;
				})
				.map((footswitch) => (
					<button
						type="button"
						class={`btn btn-circle ${
							state.selectedFootswitch === footswitch && "btn-primary"
						}`}
						onClick={() => setState({ selectedFootswitch: footswitch })}
					>
						{footswitch}
					</button>
				))}
		</div>
	);
};
