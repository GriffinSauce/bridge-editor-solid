import { Accessor } from "solid-js";
import {
	createCachedResource,
	createMutation,
	mutateCachedValue,
} from "solid-cached-resource";
import { device } from "../services/device";
import { BankSettings } from "pirate-midi-usb";

export const createGetBank = (getBankNumber: Accessor<number>) =>
	createCachedResource(
		() => ["banks", getBankNumber()],
		([, bankNumber]) => device()!.getBankSettings(bankNumber as number)
	);

export const createUpdateBank = (getBankNumber: Accessor<number>) =>
	createMutation(
		(data: Partial<BankSettings>) =>
			device()!.setBankSettings(getBankNumber(), data),
		{
			onSuccess: (user) => {
				mutateCachedValue(() => ["bank", getBankNumber()], user);
				void refreshScreen(getBankNumber);
			},
		}
	);

const refreshScreen = async (getBankNumber: Accessor<number>) => {
	try {
		const { currentBank } = await device()!.getGlobalSettings();
		if (currentBank === getBankNumber())
			void device()!.goToBank(getBankNumber());
	} catch (error) {
		console.error("Failed to refresh screen", error);
	}
};
