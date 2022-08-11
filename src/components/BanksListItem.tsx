import { Component } from "solid-js";
import { createGetBank } from "../resources/bank";
import { setState, state } from "../store";

interface Props {
	bankNumber: number;
}

export const BanksListItem: Component<Props> = ({ bankNumber }) => {
	const onClick = () => setState({ selectedBank: bankNumber });

	const [bank, { update }] = createGetBank(() => bankNumber);

	const onChange = (event) => {
		update({ bankName: event.target.value });
	};

	return (
		<li class="form-control">
			<label class="cursor-pointer input-group">
				<span
					class={`flex items-center justify-center w-12 ${
						state.selectedBank === bankNumber &&
						"bg-secondary text-secondary-content"
					}`}
				>
					{bankNumber}
				</span>
				<input
					class="cursor-pointer focus:outline-none input grow bg-base-200"
					type="text"
					placeholder={`Bank ${bankNumber}`}
					value={bank()?.bankName || ""}
					onChange={onChange}
					onClick={onClick}
					onFocus={onClick}
				/>
			</label>
		</li>
	);
};
