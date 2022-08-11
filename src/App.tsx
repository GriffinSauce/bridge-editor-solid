import type { Component } from "solid-js";
import EditorController from "./components/EditorController";
import Navigation from "./components/Navigation";

const App: Component = () => {
	return (
		<div class="flex flex-col items-stretch justify-center h-screen bg-base-100">
			<div class="mb-3">
				<Navigation />
			</div>

			<EditorController />
		</div>
	);
};

export default App;
