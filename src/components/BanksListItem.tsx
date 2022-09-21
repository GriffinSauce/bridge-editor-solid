import { Component } from "solid-js";
import { createGetBank, createMutateBank } from "../resources/bank";
import { setState, state } from "../store";
import { device } from "../services/device";

interface Props {
	bankNumber: number;
}

export const BanksListItem: Component<Props> = ({ bankNumber }) => {
	const onClick = () => {
		setState({ selectedBank: bankNumber });
		device()!.goToBank(bankNumber);
	};

	const getBankNumber = () => bankNumber;
	const [bank] = createGetBank(getBankNumber);
	const { mutateAsync } = createMutateBank(getBankNumber);

	const onChange = (event) => mutateAsync({ bankName: event.target.value });

	return (
		<li class="form-control">
			<label class="cursor-pointer input-group">
				<span
					classList={{
						"text-accent": state.selectedBank === bankNumber,
					}}
					class="flex items-center justify-center w-12 text-sm font-semibold"
				>
					{bankNumber}
				</span>
				<input
					classList={{
						"text-accent": state.selectedBank === bankNumber,
					}}
					class="cursor-pointer focus:outline-none input grow bg-base-200"
					type="text"
					placeholder={`Bank ${bankNumber}`}
					value={bank()?.bankName || ""}
					onInput={onChange}
					onClick={onClick}
					onFocus={onClick}
				/>
			</label>
		</li>
	);
};
