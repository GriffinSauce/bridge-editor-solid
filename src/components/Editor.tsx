import { Component, createSignal } from "solid-js";
import { Bank } from "./Bank";
import { BanksList } from "./BanksList";
// import { GlobalSettings } from './GlobalSettings';

const GlobalSettings = () => "GlobalSettings";

const Editor: Component = () => {
	const [tab, setTab] = createSignal<"banks" | "global">("banks");

	return (
		<main class="flex flex-col items-start justify-start flex-1 min-h-0 px-6 space-y-3 text-center">
			<div class="tabs tabs-bordered">
				<a
					classList={{
						"tab-active": tab() === "banks",
					}}
					class="tab tab-bordered"
					onClick={() => setTab("banks")}
				>
					Banks
				</a>
				<a
					classList={{
						"tab-active": tab() === "global",
					}}
					class="tab tab-bordered"
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
