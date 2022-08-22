import { Component, For, onMount } from "solid-js";
import { debounce } from "lodash-es";
import { MessageStack } from "./MessageStack";
import { messageTypes } from "./MessageStack/config";

let messageContainerScroll: number;

export const Messages: Component = () => {
	let messagesContainer: HTMLDivElement;

	const handleScroll = debounce(() => {
		messageContainerScroll = messagesContainer.scrollLeft;
	}, 300);

	onMount(() => {
		if (messageContainerScroll)
			messagesContainer.scrollLeft = messageContainerScroll;
		messagesContainer.addEventListener("scroll", handleScroll);
	});

	return (
		<div
			ref={messagesContainer}
			class="flex justify-start gap-6 overflow-x-scroll -mr-6"
		>
			<For each={messageTypes}>{(type) => <MessageStack type={type} />}</For>
		</div>
	);
};
