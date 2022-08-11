import { Component, Match, Switch } from "solid-js";
import { device, connected, connect, connectMock } from "../services/device";
import Editor from "./Editor";

const Intro = () => (
	<main class="flex flex-col items-center justify-center flex-1 px-20 space-y-6 text-center">
		<h1 class="text-5xl font-bold text-center">Bridge Editor</h1>

		<p class="text-2xl">
			An aftermarket editor for Pirate Midi Bridge4 &amp; Bridge6 controllers.
		</p>

		<button class="btn btn-primary" onClick={connect}>
			Connect
		</button>

		<button class="btn" onClick={connectMock}>
			Demo
		</button>
	</main>
);

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
