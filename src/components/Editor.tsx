import { Component, createSignal } from "solid-js";
import { Backup } from "./Backup";
import { Bank } from "./Bank";
import { BanksList } from "./BanksList";

const Editor: Component = () => {
	const [tab, setTab] = createSignal<"banks" | "backup">("banks");

	return (
		<main class="flex flex-col items-stretch justify-start flex-1 min-h-0 px-6 space-y-3 text-center ">
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
						"tab-active": tab() === "backup",
					}}
					class="tab tab-bordered"
					onClick={() => setTab("backup")}
				>
					Backup
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
				<Backup />
			)}
		</main>
	);
};

export default Editor;
