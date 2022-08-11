import { Accessor, createResource, ResourceReturn } from "solid-js";
import { device } from "../services/device";
import { BankSettings } from "pirate-midi-usb";

type Update<Data> = (data: Partial<Data>) => Promise<void>;

interface AdditionalActions<Data> {
	update: Update<Data>;
}

// We can probably use infer to make this less manual
type AddActions<Base extends ResourceReturn<any, any>> = [
	Base[0],
	Base[1] & AdditionalActions<BankSettings>
];

const getBankSettings = async (bankNumber: number) => {
	return device()!.getBankSettings(bankNumber);
};

export const createGetBank = (getBankNumber: Accessor<number>) => {
	const resourceReturn = createResource(getBankNumber, getBankSettings);
	const [bank, actions] = resourceReturn;
	const { mutate, refetch } = actions;

	const update = async (data: Partial<BankSettings>) => {
		const previousData = {
			...bank(),
		};

		// Optimistically update to the new value
		mutate({
			...bank(),
			...data,
		});

		try {
			await device()!.setBankSettings(getBankNumber(), data);
		} catch (error) {
			mutate(previousData);
		} finally {
			refetch();
		}

		const { currentBank } = await device()!.getGlobalSettings();
		if (currentBank === getBankNumber())
			void device()!.goToBank(getBankNumber());
	};

	const output: AddActions<typeof resourceReturn> = [
		bank,
		{
			...actions,
			update,
		},
	];
	return output;
};
