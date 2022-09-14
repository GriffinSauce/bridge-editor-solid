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
		(data: Partial<BankSettings>) =>
			device()!.setBankSettings(getBankNumber(), data),
		{
			onSuccess: (user) => {
				void device()!.refreshDisplay();
				void device()!.refreshLeds();
				mutateCachedValue(() => ["bank", getBankNumber()], user);
			},
		},
	);
