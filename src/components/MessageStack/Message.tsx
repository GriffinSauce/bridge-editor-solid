import { set } from "lodash-es";
import {
	decodeMidiMessage,
	encodeMidiMessage,
	MidiMessageType,
	RawMessage,
	RawExpMessage,
	RawSmartMessage,
	ParsedMessage,
	ParsedExpMessage,
	ParsedSmartMessage,
} from "pirate-midi-usb";
import { VsClose } from "solid-icons/vs";
import { Accessor, createContext, useContext } from "solid-js";
import { createStore, produce } from "solid-js/store";

import { Fields, SmartFields } from "./Fields";
import { OutputsSelector } from "./OutputsSelector";
import { TypeSelect } from "./TypeSelect";

type RegisterOptions = { offset?: number };
type Register = (
	input: HTMLInputElement,
	param: Accessor<RegisterOptions>,
) => void;

// Add use:register to JSX props
declare module "solid-js" {
	namespace JSX {
		interface Directives {
			register?: RegisterOptions;
		}
	}
}

const MessageContext = createContext<{ register: Register }>();
export const useMessageContext = () => useContext(MessageContext);

type AnyParsedMessage = ParsedMessage | ParsedExpMessage | ParsedSmartMessage;

interface Props {
	message: RawMessage | RawExpMessage | RawSmartMessage;
}

export const Message = ({ message: rawMessage }: Props) => {
	// const message = decodeMidiMessage(rawMessage);

	// Store state is only used for reactive UI
	const [message, setMessage] = createStore(decodeMidiMessage(rawMessage));

	const fields: Record<
		string,
		{
			element: HTMLInputElement;
			isValid: boolean;
			isActive: boolean;
			path: string[];
			value: number | string | boolean;
		}
	> = {};

	const sync = () => {
		const newMessage = {};
		for (const { isValid, isActive, path, value } of Object.values(fields)) {
			if (!isActive) continue;
			if (!isValid) return;
			set(newMessage, path, value);
		}

		console.log("newMessage", newMessage);

		const encoded = encodeMidiMessage(newMessage as AnyParsedMessage);

		console.log("Should save encoded", encoded);
	};

	const register: Register = (input, options) => {
		// TODO: bug? Element is missing attributes in first tick
		setTimeout(() => {
			const key = input.name;
			const path = key.split(".");

			const getValue = () => {
				let value: number | string | boolean = input.value;
				if (input.type === "number") {
					if (input.value.length === 0) return;
					const offset = options().offset || 0;
					value = input.valueAsNumber - offset;
				}
				if (input.type === "checkbox") value = input.checked;
				return value;
			};

			fields[key] = {
				element: input,
				isValid: false,
				path,
				get isActive(): boolean {
					return document.body.contains(input);
				},
				get value() {
					return getValue();
				},
			};

			// Basic validation, just checks whether field is set
			const validate = () => {
				const value = getValue();

				if (input.type === "number") return Number.isFinite(value);

				return value !== undefined && value !== null;
			};

			const onChange = () => {
				const isValid = (fields[input.name].isValid = validate());
				if (!isValid) return;

				setMessage(
					produce((state) => {
						set(state, key, getValue());
					}),
				);
			};

			onChange();
			input.onchange = () => {
				onChange();

				// Wait for new fields to be registered
				setTimeout(() => {
					sync();
				});
			};
		});
	};

	return (
		<MessageContext.Provider value={{ register }}>
			<form class="bg-neutral rounded-lg [width:18rem] p-1 grid gap-3">
				<div class="flex justify-between relative">
					<TypeSelect message={message} />

					<button class="btn btn-sm">
						<VsClose />
					</button>
				</div>

				<Fields message={message} />

				{message.type === MidiMessageType.SmartMessage ? (
					<SmartFields message={message} />
				) : (
					<OutputsSelector message={message} />
				)}
			</form>
		</MessageContext.Provider>
	);
};
