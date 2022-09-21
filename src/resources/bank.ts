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

export const createMutateBank = (getBankNumber: Accessor<number>) =>
	createMutation(
		async (data: Partial<BankSettings>) => {
			await device()!.setBankSettings(getBankNumber(), data);
			return device()!.getBankSettings(getBankNumber());
		},
		{
			onSuccess: async (bank) => {
				await device()!.refreshDisplay();
				await device()!.refreshLeds();
				mutateCachedValue(() => ["banks", getBankNumber()], bank);
			},
		},
	);

export const createUpdateBank =
	(getBankNumber: Accessor<number>) => async (data: Partial<BankSettings>) => {
		await device()!.setBankSettings(getBankNumber(), data);
		await device()!.refreshDisplay();
		await device()!.refreshLeds();
	};

export const createRefetchBank =
	(getBankNumber: Accessor<number>) => async () => {
		const bank = await device()!.getBankSettings(getBankNumber());
		mutateCachedValue(() => ["banks", getBankNumber()], bank);
	};
