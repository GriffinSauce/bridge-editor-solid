import { ParsedExpMessage, ParsedMessage } from "pirate-midi-usb";
import { Component } from "solid-js";
import { device } from "../../services/device";
import { useMessageContext } from "./Message";

// TODO: determine how hardware descriptors map to message keys
// For now this should work for Bridge6 and Bridge4
const getOutputs = (hardware: {
	flexiports: number;
	midiOutPorts: number;
	midiInPorts: number;
}) => {
	return {
		midi0: {
			label: "DIN5",
		},
		flexi1: {
			label: "Flexi1",
		},
		flexi2: {
			label: "Flexi2",
		},
		usb: {
			label: "USB",
		},
	};
};

type Message = ParsedMessage | ParsedExpMessage;

interface Props {
	message: Message;
}

export const OutputsSelector: Component<Props> = ({ message }) => {
	const { register } = useMessageContext();
	false && register; // Prevent TS from omitting

	return (
		<div class="grid grid-cols-4">
			{Object.entries(
				getOutputs(device()!.getDeviceDescription().hardware),
			).map(([port, { label }]) => (
				<label class="label cursor-pointer justify-start gap-1">
					<input
						id={`outputs.${port}`}
						name={`outputs.${port}`}
						type="checkbox"
						class="toggle toggle-xs peer"
						checked={!!message.outputs?.[port]}
						use:register={{}}
					/>
					<span class="label-text text-xs text-base-content/50 peer-checked:text-base-content">
						{label}
					</span>
				</label>
			))}
		</div>
	);
};
