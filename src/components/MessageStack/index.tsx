import { Accessor, Component, createComputed, For } from "solid-js";
import { AiOutlinePlus } from "solid-icons/ai";

import { state } from "../../store";
import { createGetBank } from "../../resources/bank";
import { messageStacks, MessageStackType } from "./config";
import { Message } from "./Message";
import { get } from "lodash-es";
import {
	BankSettings,
	RawExpMessage,
	RawMessage,
	RawSmartMessage,
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
	const [bank] = createGetBank(getBankNumber);
	const Icon = messageStacks[type].icon;

	return (
		<div class="[flex-basis:12rem] flex-shrink-0 flex flex-col gap-2">
			<div class="p-3 flex items-center rounded-lg bg-base-300 font-semibold gap-3">
				<Icon />
				<span>{messageStacks[type].title}</span>
			</div>

			<For each={getMessages({ type, bank })}>
				{(message, index) => (
					<Message
						message={message}
						stackPath={getMessageStackPath(type)}
						index={index}
					/>
				)}
			</For>

			<button class="btn flex items-center justify-center no-animation">
				<AiOutlinePlus />
			</button>
		</div>
	);
};
