import { device } from "../services/device";
import { saveAs } from "file-saver";
import { createSignal, Match, Switch } from "solid-js";

export const Backup = () => {
	const [state, setState] = createSignal<"idle" | "busy">("idle");
	const [progress, setProgress] = createSignal(0);

	const createBackup = async () => {
		setState("busy");

		const deviceSettings = device().deviceInfo!;

		const globalSettings = await device().getGlobalSettings();

		const { numberBanks } = device().getDeviceDescription();
		const bankSettings = [];
		for (let i = 0; i < numberBanks; i++) {
			bankSettings.push(await device().getBankSettings(i));
			setProgress((i / numberBanks) * 100);
		}

		const config = {
			deviceSettings,
			globalSettings,
			bankSettings,
		};

		const blob = new Blob([JSON.stringify(config)], {
			type: "text/plain;charset=utf-8",
		});
		saveAs(
			blob,
			`${deviceSettings.deviceModel.toLowerCase()}-backup-${new Date().toISOString()}.json`,
		);

		setState("idle");
	};

	return (
		<div class="flex justify-center items-center grow">
			<Switch>
				<Match when={state() === "idle"}>
					<button class="btn" onClick={createBackup}>
						Download a backup
					</button>
				</Match>
				<Match when={state() === "busy"}>
					<label class="grid gap-2">
						<span class="text-sm italic">Creating backup</span>
						<progress
							class="progress progress-primary w-56"
							value={progress()}
							max="100"
						>
							{progress()} %
						</progress>
					</label>
				</Match>
			</Switch>
		</div>
	);
};
