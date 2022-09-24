import { device } from "../services/device";

export const Update = () => {
	const enterBootLoader = async () => {
		device()!.enterBootloader();
	};

	const factoryReset = async () => {
		if (confirm("Sure ya wanna nuke your config?"))
			device()!.factoryReset({ sure: true });
	};

	return (
		<div class="flex justify-center flex-col items-center grow gap-3">
			<button class="btn" onClick={enterBootLoader}>
				Enter bootloader
			</button>
			<button class="btn" onClick={factoryReset}>
				Factory reset
			</button>
		</div>
	);
};
