import { Component, Match, Switch } from "solid-js";
import {
	createGetBank,
	createRefetchBank,
	createUpdateBank,
} from "../resources/bank";
import { device } from "../services/device";
import { state } from "../store";
import { FootswitchSelector } from "./FootswitchSelector";
import { Messages } from "./Messages";
import { debounce } from "lodash-es";

const getBankNumber = () => state.selectedBank;

export const Bank: Component = () => {
	const { bankNameLength } = device()!.getDeviceDescription();

	const [bank] = createGetBank(getBankNumber);
	const updateBank = createUpdateBank(getBankNumber);
	const refetchBank = createRefetchBank(getBankNumber);

	const onChangeBankName = debounce((event) => {
		updateBank({ bankName: event.target.value });
	}, 100);

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
							maxLength={bankNameLength}
							onInput={onChangeBankName}
							onBlur={refetchBank}
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
