import {
	ParsedExpMessage,
	ParsedMessage,
	ParsedSmartMessage,
} from "pirate-midi-usb";
import { Component, createEffect, createSignal } from "solid-js";
import { messages } from "./config";
import { useMessageContext } from "./Message";

type Message = ParsedMessage | ParsedExpMessage | ParsedSmartMessage;

interface Props {
	message: Message;
}

export const TypeSelect: Component<Props> = ({ message }) => {
	const { register } = useMessageContext();
	false && register; // Prevent TS from omitting

	let selectWidthHelper: HTMLDivElement | undefined;
	const [selectWidth, setSelectWidth] = createSignal(0);
	createEffect(() => {
		message.type; // Depend on type change
		setSelectWidth(selectWidthHelper.clientWidth + 30);
	});

	return (
		<>
			<div
				ref={selectWidthHelper}
				class="font-semibold text-sm absolute px-1 border border-transparent opacity-0 z-0"
			>
				{messages[message.type].title}
			</div>
			<select
				id="type"
				name="type"
				class="select select-sm select-ghost text-secondary focus:text-secondary px-1 pr-4 z-10"
				style={{
					width: `${selectWidth()}px`,
				}}
				use:register={{}}
			>
				<option disabled selected>
					Type
				</option>
				{Object.entries(messages).map(([value, { title }]) => (
					<option selected={value === message.type} value={value}>
						{title}
					</option>
				))}
			</select>
		</>
	);
};
