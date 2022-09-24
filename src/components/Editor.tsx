import { Component, createSignal } from "solid-js";
import { Backup } from "./Backup";
import { Bank } from "./Bank";
import { BanksList } from "./BanksList";
import { Update } from "./Update";

const tabs = [
	{
		id: "banks",
		label: "Banks",
	},
	{
		id: "backup",
		label: "Backup",
	},
	{
		id: "update",
		label: "Update",
	},
] as const;

const Editor: Component = () => {
	const [tab, setTab] = createSignal<"banks" | "backup" | "update">("banks");

	return (
		<main class="flex flex-col items-stretch justify-start flex-1 min-h-0 px-6 space-y-3 text-center ">
			<div class="tabs tabs-bordered">
				{tabs.map(({ id, label }) => (
					<a
						classList={{
							"tab-active": tab() === id,
						}}
						class="tab tab-bordered"
						onClick={() => setTab(id)}
					>
						{label}
					</a>
				))}
			</div>

			{
				{
					banks: (
						<div class="flex min-h-0 gap-6">
							<div class="flex flex-shrink-0">
								<BanksList />
							</div>
							<div class="flex-grow">
								<Bank />
							</div>
						</div>
					),
					backup: <Backup />,
					update: <Update />,
				}[tab()]
			}
		</main>
	);
};

export default Editor;
