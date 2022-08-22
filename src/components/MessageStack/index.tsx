import { Component, For } from "solid-js";
import { AiOutlinePlus } from "solid-icons/ai";

import { state } from "../../store";
import { createGetBank } from "../../resources/bank";
import { messageStacks, MessageStackType } from "./config";
import { Message } from "./Message";

const getBankNumber = () => state.selectedBank;

interface Props {
	type: MessageStackType;
}

export const MessageStack: Component<Props> = ({ type }) => {
	const [bank] = createGetBank(getBankNumber);
	const Icon = messageStacks[type].icon;

	return (
		<div class="[flex-basis:12rem] flex-shrink-0 flex flex-col gap-2">
			<div class="p-3 flex items-center rounded-lg bg-base-300 font-semibold gap-3">
				<Icon />
				<span>{messageStacks[type].title}</span>
			</div>

			<For
				each={
					type === "bank"
						? bank().bankMessages.messages
						: bank().footswitches[state.selectedFootswitch]?.[`${type}Messages`]
								?.messages
				}
			>
				{(message) => <Message message={message} />}
			</For>

			<button class="btn flex items-center justify-center no-animation">
				<AiOutlinePlus />
			</button>
		</div>
	);
};
