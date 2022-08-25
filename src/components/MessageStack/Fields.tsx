import {
	ParsedExpMessage,
	ParsedMessage,
	ParsedSmartMessage,
} from "pirate-midi-usb";
import { Component, For } from "solid-js";
import {
	flexiPartOptions,
	messages,
	noteOptions,
	smartMessageFields,
	smartTypeOptions,
	switchSideOptions,
} from "./config";
import { useMessageContext } from "./Message";

type Message = ParsedMessage | ParsedExpMessage | ParsedSmartMessage;

interface Props {
	message: Message;
}

const InputNumber = ({ message, key, label, min, max, offset = 0 }) => {
	const { register } = useMessageContext();
	false && register; // Prevent TS from omitting

	return (
		<div class="form-control min-w-0 basis-full flex-grow flex-shrink">
			<label class="grid cursor-pointer" for={key}>
				<span class="text-sm p-1">{label}</span>
				<input
					id={key}
					name={key}
					type="number"
					class="input input-sm pr-0"
					value={message[key] + offset}
					min={min + offset}
					max={max + offset}
					use:register={{ offset }}
				/>
			</label>
		</div>
	);
};

const InputSelect = ({ message, key, label, options }) => {
	const { register } = useMessageContext();
	false && register; // Prevent TS from omitting

	return (
		<div class="form-control min-w-0 basis-full flex-grow flex-shrink">
			<label class="grid cursor-pointer" for={key}>
				<span class="text-sm p-1">{label}</span>
				<select
					id={key}
					name={key}
					class="select select-sm font-normal px-1 pr-4 z-10"
					use:register={{}}
				>
					{options.map(({ label, value: option }) => (
						<option selected={message[key] === option} value={option}>
							{label}
						</option>
					))}
				</select>
			</label>
		</div>
	);
};

export const Fields: Component<Props> = ({ message }) => {
	return (
		<div class="flex gap-1">
			<For each={messages[message.type].fields}>
				{(fieldKey) => {
					if (fieldKey === "channel")
						return (
							<InputNumber
								message={message}
								key="channel"
								label="Channel"
								min={1}
								max={16}
							/>
						);

					if (fieldKey === "octave")
						return (
							<InputNumber
								message={message}
								key="octave"
								label="Octave"
								min={-4}
								max={4}
							/>
						);

					if (fieldKey === "note")
						return (
							<InputSelect
								message={message}
								key="note"
								label="Note"
								options={noteOptions}
							/>
						);

					if (fieldKey === "velocity")
						return (
							<InputNumber
								message={message}
								key="velocity"
								label="Velocity"
								min={0}
								max={127}
							/>
						);

					if (fieldKey === "control")
						return (
							<InputNumber
								message={message}
								key="number"
								label="Control"
								min={0}
								max={127}
							/>
						);

					if (fieldKey === "number")
						return (
							<InputNumber
								message={message}
								key="number"
								label="Number"
								min={0}
								max={127}
							/>
						);

					if (fieldKey === "value")
						return (
							<InputNumber
								message={message}
								key="value"
								label="Value"
								min={0}
								max={127}
							/>
						);

					if (fieldKey === "pitch")
						return (
							<InputNumber
								message={message}
								key="pitch"
								label="Pitch"
								min={-100}
								max={100}
							/>
						);

					if (fieldKey === "smartType")
						return (
							<InputSelect
								message={message}
								key="smartType"
								label="Type"
								options={smartTypeOptions}
							/>
						);
				}}
			</For>
		</div>
	);
};

interface SmartFieldsProps {
	message: ParsedSmartMessage;
}

export const SmartFields: Component<SmartFieldsProps> = ({ message }) => {
	return (
		<div class="flex gap-1">
			<For each={smartMessageFields[message.smartType]}>
				{(fieldKey) => {
					// TODO: get number of switches from config
					if (fieldKey === "switchIndex")
						return (
							<InputNumber
								message={message}
								key="switchIndex"
								label="Switch"
								min={0}
								max={5}
								offset={1}
							/>
						);

					if (fieldKey === "stepIndex")
						return (
							<InputNumber
								message={message}
								key="stepIndex"
								label="Step"
								min={0}
								max={15}
								offset={1} // TODO: check whether this is correct
							/>
						);

					if (fieldKey === "bankIndex")
						return (
							<InputNumber
								message={message}
								key="bankIndex"
								label="Bank"
								min={0}
								max={99}
							/>
						);

					if (fieldKey === "expIndex")
						return (
							<InputNumber
								message={message}
								key="expIndex"
								label="Exp"
								min={0}
								max={7}
								offset={1} // TODO: check whether this is correct
							/>
						);

					if (fieldKey === "stepIndex")
						return (
							<InputNumber
								message={message}
								key="stepIndex"
								label="Step"
								min={0}
								max={15}
								offset={1} // TODO: check whether this is correct
							/>
						);

					// TODO: get number of ports from config
					if (fieldKey === "flexiPort")
						return (
							<InputNumber
								message={message}
								key="flexiPort"
								label="Flexi port"
								min={0}
								max={1}
							/>
						);

					// TODO: find single-click UI
					if (fieldKey === "side")
						return (
							<InputSelect
								message={message}
								key="side"
								label="Switch side"
								options={switchSideOptions}
							/>
						);

					if (fieldKey === "part")
						return (
							<InputSelect
								message={message}
								key="part"
								label="Flexi part"
								options={flexiPartOptions}
							/>
						);
				}}
			</For>
		</div>
	);
};
