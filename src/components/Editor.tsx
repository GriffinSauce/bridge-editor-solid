import { Component, createSignal } from "solid-js";
import { Bank } from "./Bank";
import { BanksList } from "./BanksList";
// import { GlobalSettings } from './GlobalSettings';

const GlobalSettings = () => "GlobalSettings";

const Editor: Component = () => {
	const [tab, setTab] = createSignal<"banks" | "global">("banks");

	return (
		<main class="flex flex-col items-stretch items-start justify-start flex-1 min-h-0 px-20 space-y-3 text-center">
			<div class="tabs tabs-boxed">
				<a
					class={`tab ${tab() === "banks" ? "tab-active" : ""}`}
					onClick={() => setTab("banks")}
				>
					Banks
				</a>
				<a
					class={`tab ${tab() === "global" ? "tab-active" : ""}`}
					onClick={() => setTab("global")}
				>
					Global
				</a>
			</div>

			{tab() === "banks" ? (
				<div class="flex min-h-0 gap-6">
					<div class="flex flex-shrink-0">
						<BanksList />
					</div>
					<div class="flex-grow">
						<Bank />
					</div>
				</div>
			) : (
				<GlobalSettings />
			)}
		</main>
	);
};

export default Editor;
