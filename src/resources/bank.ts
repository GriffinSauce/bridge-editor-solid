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
		([, bankNumber]) => device()!.getBankSettings(bankNumber as number),
		{ refetchOnMount: false },
	);

export const createUpdateBank = (getBankNumber: Accessor<number>) =>
	createMutation(
		async (data: Partial<BankSettings>) => {
			await device()!.setBankSettings(getBankNumber(), data);
			return device()!.getBankSettings(getBankNumber());
		},
		{
			onSuccess: (bank) => {
				void device()!.refreshDisplay();
				void device()!.refreshLeds();
				mutateCachedValue(() => ["banks", getBankNumber()], bank);
			},
		},
	);
