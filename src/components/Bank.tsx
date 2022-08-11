import { Component, Match, Switch } from "solid-js";
import { createGetBank } from "../resources/bank";
import { state } from "../store";
// import { FootswitchSelector } from "./FootswitchSelector";
import { Messages } from "./Messages";

const FootswitchSelector = () => "FootswitchSelector";

const getBankNumber = () => state.selectedBank;

export const Bank: Component = () => {
	const [bank, { update }] = createGetBank(getBankNumber);

	const onChange = (event) => {
		update({ bankName: event.target.value });
	};

	return (
		<Switch fallback={<span>Select a bank</span>}>
			<Match when={bank.loading}>
				<span>Loading bank...</span>
			</Match>
			<Match when={bank.error}>
				<span>Error loading bank...{bank.error}</span>
			</Match>
			<Match when={bank()}>
				<div class="space-y-3 text-left">
					<section>
						<input
							type="text"
							placeholder="Bank name"
							class="w-full max-w-xs input input-bordered"
							value={bank()?.bankName}
							onChange={onChange}
						/>
					</section>

					<section>
						<FootswitchSelector />
					</section>

					<section>
						<Messages />
					</section>
				</div>
			</Match>
		</Switch>
	);
};
