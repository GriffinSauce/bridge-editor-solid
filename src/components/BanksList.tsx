import { Component } from "solid-js";
import { device } from "../services/device";
import { BanksListItem } from "./BanksListItem";

export const BanksList: Component = () => {
	const { numberBanks } = device()!.getDeviceDescription();

	return (
		<ul class="p-1 pl-0 -mt-1 space-y-2 overflow-y-scroll">
			{Array(numberBanks)
				.fill(undefined)
				.map((_, bankNumber) => (
					<BanksListItem bankNumber={bankNumber} />
				))}
		</ul>
	);
};
