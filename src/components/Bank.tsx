import { Component, Match, Switch } from "solid-js";
import { produce } from "immer";
import { createGetBank, createUpdateBank } from "../resources/bank";
import { device } from "../services/device";
import { state } from "../store";
import { FootswitchSelector } from "./FootswitchSelector";
import { Messages } from "./Messages";
import { debounce } from "lodash-es";

const getBankNumber = () => state.selectedBank;

export const Bank: Component = () => {
	const { bankNameLength, switchNameLength } = device()!.getDeviceDescription();

	const [bank] = createGetBank(getBankNumber);
	const { mutateAsync } = createUpdateBank(getBankNumber);

	const onChangeBankName = debounce((event) => {
		mutateAsync({ bankName: event.target.value });
	}, 100);

	const onChangeFootswitchName = debounce((event) => {
		const footswitches = produce(bank().footswitches, (fs) => {
			fs[state.selectedFootswitch].name = event.target.value;
		});
		mutateAsync({ footswitches });
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
						/>
					</section>

					<section>
						<FootswitchSelector />
					</section>

					<section>
						<input
							type="text"
							placeholder="Footswitch name"
							class="w-full max-w-xs input input-bordered"
							value={bank()?.footswitches[state.selectedFootswitch].name}
							maxLength={switchNameLength}
							onInput={onChangeFootswitchName}
						/>
					</section>

					<section class="min-w-0">
						<Messages />
					</section>
				</div>
			</Match>
		</Switch>
	);
};
