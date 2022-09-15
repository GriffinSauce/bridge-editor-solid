import { Accessor, Component, For } from "solid-js";
import { AiOutlinePlus } from "solid-icons/ai";

import { state } from "../../store";
import { createGetBank, createUpdateBank } from "../../resources/bank";
import { messageStacks, MessageStackType } from "./config";
import { Message } from "./Message";
import { get, set } from "lodash-es";
import { produce as produceImmer } from "immer";
import {
	BankSettings,
	encodeMidiMessage,
	MidiMessageType,
	RawExpMessage,
	RawMessage,
	RawSmartMessage,
	SmartMessageType,
} from "pirate-midi-usb";

type AnyRawMessage = RawMessage | RawExpMessage | RawSmartMessage;

interface Props {
	type: MessageStackType;
}

const getBankNumber = () => state.selectedBank;

const getMessageStackPath = (type: MessageStackType) =>
	type === "bank"
		? "bankMessages"
		: `footswitches[${state.selectedFootswitch}].${type}Messages`;

const getMessages = ({
	type,
	bank,
}: {
	type: MessageStackType;
	bank: Accessor<BankSettings>;
}) => get(bank(), `${getMessageStackPath(type)}.messages`) as AnyRawMessage[];

export const MessageStack: Component<Props> = ({ type }) => {
	const stackPath = getMessageStackPath(type);
	const [bank] = createGetBank(getBankNumber);
	const { mutateAsync } = createUpdateBank(getBankNumber);
	const Icon = messageStacks[type].icon;

	const addMessage = () => {
		const updatedBank = produceImmer(bank(), (bank) => {
			const messages = [
				...(get(bank, `${stackPath}.messages`) as AnyRawMessage[]),
				encodeMidiMessage({
					type: MidiMessageType.SmartMessage,
					smartType: SmartMessageType.BankUp,
				}),
			];

			set(bank, stackPath, {
				numMessages: messages.length,
				messages,
			});
		});

		console.log("updatedBank", updatedBank.footswitches[0].pressMessages);
		mutateAsync(updatedBank);
	};

	return (
		<div class="[flex-basis:12rem] flex-shrink-0 flex flex-col gap-2">
			<div class="p-3 flex items-center rounded-lg bg-base-300 font-semibold gap-3">
				<Icon />
				<span>{messageStacks[type].title}</span>
			</div>

			<For each={getMessages({ type, bank })}>
				{(message, index) => (
					<Message message={message} stackPath={stackPath} index={index} />
				)}
			</For>

			<button
				class="btn flex items-center justify-center no-animation"
				onClick={addMessage}
			>
				<AiOutlinePlus />
			</button>
		</div>
	);
};
