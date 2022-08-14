import { decodeMidiMessage } from "pirate-midi-usb";
import { BaseMessage, ExpMessage } from "pirate-midi-usb/lib/types/Messages";
import { VsClose } from "solid-icons/vs";
import { createEffect, createSignal } from "solid-js";
import { device } from "../../services/device";
import { midiMessages } from "./config";

// TODO: determine how hardware descriptors map to message keys
// For now this should work for Bridge6 and Bridge4
const getOutputs = (hardware: {
	flexiports: number;
	midiOutPorts: number;
	midiInPorts: number;
}) => {
	return {
		midi0: {
			title: "DIN5",
		},
		flexi1: {
			title: "Flexi1",
		},
		flexi2: {
			title: "Flexi2",
		},
		usb: {
			title: "USB",
		},
	};
};

interface Props {
	message: BaseMessage | ExpMessage;
}

export const Message = ({ message }: Props) => {
	const parsedMessage = decodeMidiMessage(message);
	const [type, setType] = createSignal(parsedMessage.type);
	// const { fields } = midiMessages[type()];

	let selectWidthHelper;
	const [selectWidth, setSelectWidth] = createSignal(0);
	createEffect(() => {
		type(); // Depend on type change
		setSelectWidth(selectWidthHelper.clientWidth + 30);
	});

	return (
		<div class="bg-neutral rounded-lg [width:18rem] p-1 grid gap-3">
			<div class="flex justify-between relative">
				<div
					ref={selectWidthHelper}
					class="font-semibold text-sm absolute px-1 border border-transparent opacity-0 z-0"
				>
					{midiMessages[type()].title}
				</div>
				<select
					class="select select-sm select-ghost text-secondary focus:text-secondary px-1 pr-4 z-10"
					style={{
						width: `${selectWidth()}px`,
					}}
					onChange={(event) => setType(event.currentTarget.value)}
				>
					<option disabled selected>
						Type
					</option>
					{Object.entries(midiMessages).map(([value, { title }]) => (
						<option selected={value === type()} value={value}>
							{title}
						</option>
					))}
				</select>

				<button class="btn btn-sm">
					<VsClose />
				</button>
			</div>

			<div class="flex gap-1">
				{Object.entries(midiMessages[type()].fields).map(([key, { label }]) => (
					<div class="form-control min-w-0 flex-grow">
						<label class="grid cursor-pointer" for={key}>
							<span class="text-sm p-1">{label}</span>
							<input
								id={key}
								name={key}
								type="number"
								class="input input-sm pr-0"
								value={parsedMessage[key]}
								min={0}
								max={127}
							/>
						</label>
					</div>
				))}
			</div>

			<div class="grid grid-cols-4">
				{Object.entries(
					getOutputs(device()!.getDeviceDescription().hardware),
				).map(([port, { title }]) => (
					<label class="label cursor-pointer justify-start gap-1">
						<input
							type="checkbox"
							class="toggle toggle-xs peer"
							checked={parsedMessage.outputs[port]}
						/>
						<span class="label-text text-xs text-base-content/50 peer-checked:text-base-content">
							{title}
						</span>
					</label>
				))}
			</div>
		</div>
	);
};
