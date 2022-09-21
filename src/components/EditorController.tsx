import { Component, Match, Switch } from "solid-js";
import { device, connected, connect, connectMock } from "../services/device";
import Editor from "./Editor";

const Intro = () => {
	let fileInput;
	const requestFile = () => {
		fileInput.click();
	};

	const openFile = function (event) {
		const input = event.target;

		if (!input.files?.length) return;

		const reader = new FileReader();

		reader.onload = function () {
			try {
				const data = JSON.parse(reader.result.toString());
				console.info("Loaded config", data);

				const { deviceSettings, globalSettings, bankSettings } = data;
				connectMock({
					deviceInfo: deviceSettings,
					globalSettings,
					banks: bankSettings,
				});
			} catch (error) {
				console.error(error);
				alert("Error loading config, see console");
			}
		};

		reader.readAsText(input.files[0]);
	};
	return (
		<main class="flex flex-col items-center justify-center flex-1 px-20 space-y-6 text-center">
			<h1 class="text-5xl font-bold text-center">Bridge Editor</h1>

			<p class="text-2xl">
				An <span class="font-semibold">unofficial</span> editor for Pirate Midi
				Bridge controllers.
			</p>

			<button class="btn btn-primary" onClick={connect}>
				Connect device
			</button>

			<input
				ref={fileInput}
				class="hidden"
				type="file"
				accept=".json"
				onChange={openFile}
			/>
			<button class="btn" onClick={requestFile}>
				Upload a file
			</button>
		</main>
	);
};

const Disconnected = () => (
	<main class="flex flex-col items-center justify-center flex-1 px-20 space-y-6 text-center">
		<p>Device disconnected, plug in to reconnect.</p>
		<button class="btn btn-primary" onClick={connect}>
			I already did
		</button>
	</main>
);

const EditorController: Component = () => {
	return (
		<Switch fallback={<Intro />}>
			<Match when={device() && connected()}>
				<Editor />
			</Match>
			<Match when={device()}>
				<Disconnected />
			</Match>
		</Switch>
	);
};

export default EditorController;
