import { Component, For } from "solid-js";
import { AiOutlinePlus } from "solid-icons/ai";
import { MidiMessage } from "midi-message-parser";

import { state } from "../../store";
import { createGetBank } from "../../resources/bank";
import { configs, MessageType } from "./config";

const getBankNumber = () => state.selectedBank;

interface Props {
	type: MessageType;
}

export const MessageStack: Component<Props> = ({ type }) => {
	const [bank] = createGetBank(getBankNumber);
	const key = `${type}Messages`;
	const Icon = configs[type].icon;

	return (
		<div class="[flex-basis:12rem] flex-shrink-0 flex flex-col gap-2">
			<div class="p-3 flex items-center rounded-lg bg-base-300 font-semibold gap-3">
				<Icon />
				<span>{configs[type].title}</span>
			</div>

			<For
				each={
					bank().footswitches[state.selectedFootswitch]?.[key]?.messages || []
				}
			>
				{(item) => {
					const { statusByte, dataByte1, dataByte2 } = item;
					const dataArray = [
						parseInt(statusByte, 16),
						parseInt(dataByte1, 16),
						parseInt(dataByte2, 16),
					];
					const message = new MidiMessage(dataArray);
					return JSON.stringify(message, null, 2);
				}}
			</For>

			<button class="btn flex items-center justify-center no-animation">
				<AiOutlinePlus />
			</button>
		</div>
	);
};
