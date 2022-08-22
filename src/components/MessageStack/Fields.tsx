import {
	ParsedExpMessage,
	ParsedMessage,
	ParsedSmartMessage,
} from "pirate-midi-usb";
import { Component } from "solid-js";
import {
	flexiPartOptions,
	messages,
	noteOptions,
	smartMessageFields,
	smartTypeOptions,
	switchSideOptions,
} from "./config";

type Message = ParsedMessage | ParsedExpMessage | ParsedSmartMessage;

interface Props {
	message: Message;
	onChange: (update: Record<string, number | string>) => void;
}

const InputNumber = ({ message, key, label, min, max, onChange }) => {
	const value = message[key];
	const handleChange = (event) =>
		onChange({
			[key]: event.currentTarget.value,
		});

	return (
		<div class="form-control min-w-0 flex-grow">
			<label class="grid cursor-pointer" for={key}>
				<span class="text-sm p-1">{label}</span>
				<input
					id={key}
					name={key}
					type="number"
					class="input input-sm pr-0"
					value={value}
					min={min}
					max={max}
					onChange={handleChange}
				/>
			</label>
		</div>
	);
};

const InputSelect = ({ message, key, label, options, onChange }) => {
	const value = message[key];
	const handleChange = (event) =>
		onChange({
			[key]: event.currentTarget.value,
		});

	return (
		<div class="form-control min-w-0 flex-grow">
			<label class="grid cursor-pointer" for={key}>
				<span class="text-sm p-1">{label}</span>
				<select
					class="select select-sm text-secondary focus:text-secondary px-1 pr-4 z-10"
					onChange={handleChange}
				>
					{options.map(({ label, value: option }) => (
						<option selected={value === option} value={option}>
							{label}
						</option>
					))}
				</select>
			</label>
		</div>
	);
};

export const Fields: Component<Props> = ({ message, onChange }) => {
	return (
		<div class="flex gap-1">
			{messages[message.type].fields.map((fieldKey) => {
				if (fieldKey === "channel")
					return (
						<InputNumber
							message={message}
							key="channel"
							label="Channel"
							min={1}
							max={16}
							onChange={onChange}
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
							onChange={onChange}
						/>
					);

				if (fieldKey === "note")
					return (
						<InputSelect
							message={message}
							key="note"
							label="Note"
							options={noteOptions}
							onChange={onChange}
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
							onChange={onChange}
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
							onChange={onChange}
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
							onChange={onChange}
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
							onChange={onChange}
						/>
					);

				if (fieldKey === "pitch")
					return (
						<InputNumber
							message={message}
							key="pitch"
							label="Pitch bend"
							min={-100}
							max={100}
							onChange={onChange}
						/>
					);

				if (fieldKey === "smartType")
					return (
						<InputSelect
							message={message}
							key="smartType"
							label="Type"
							options={smartTypeOptions}
							onChange={onChange}
						/>
					);
			})}
		</div>
	);
};

export const SmartFields: Component<Props> = ({ message, onChange }) => {
	return (
		<div class="flex gap-1">
			{smartMessageFields[message.smartType].map((fieldKey) => {
				// TODO: get number of switches from config
				if (fieldKey === "switchIndex")
					return (
						<InputNumber
							message={message}
							key="switchIndex"
							label="Switch"
							min={1}
							max={6}
							onChange={onChange} // TODO: -1
						/>
					);

				if (fieldKey === "stepIndex")
					return (
						<InputNumber
							message={message}
							key="stepIndex"
							label="Step"
							min={1}
							max={16}
							onChange={onChange} // TODO: -1 ?
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
							onChange={onChange}
						/>
					);

				if (fieldKey === "expIndex")
					return (
						<InputNumber
							message={message}
							key="expIndex"
							label="Exp"
							min={1}
							max={8}
							onChange={onChange} // TODO: -1 ?
						/>
					);

				if (fieldKey === "stepIndex")
					return (
						<InputNumber
							message={message}
							key="stepIndex"
							label="Step"
							min={1}
							max={16}
							onChange={onChange} // TODO: -1 ?
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
							onChange={onChange}
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
							onChange={onChange}
						/>
					);

				if (fieldKey === "part")
					return (
						<InputSelect
							message={message}
							key="part"
							label="Flexi part"
							options={flexiPartOptions}
							onChange={onChange}
						/>
					);
			})}
		</div>
	);
};
