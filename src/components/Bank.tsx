import { Component, Match, Switch } from "solid-js";
import { createGetBank, createUpdateBank } from "../resources/bank";
import { state } from "../store";
import { FootswitchSelector } from "./FootswitchSelector";
import { Messages } from "./Messages";

const getBankNumber = () => state.selectedBank;

export const Bank: Component = () => {
	const [bank] = createGetBank(getBankNumber);
	const { mutateAsync } = createUpdateBank(getBankNumber);

	const onChange = (event) => mutateAsync({ bankName: event.target.value });

	return (
		<Switch fallback={<span>Select a bank</span>}>
			<Match when={bank.loading}>
				<span>Loading bank...</span>
			</Match>
			<Match when={bank.error}>
				<span>Error loading bank...{bank.error}</span>
			</Match>
			<Match when={bank()}>
				<div class="grid gap-6 text-left">
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

					<section class="min-w-0">
						<Messages />
					</section>
				</div>
			</Match>
		</Switch>
	);
};
