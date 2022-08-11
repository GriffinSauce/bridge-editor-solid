import { state } from "../store";

export const Messages = () => {
	return (
		<div>
			Messages for bank {state.selectedBank} footswitch{" "}
			{state.selectedFootswitch}
		</div>
	);
};
