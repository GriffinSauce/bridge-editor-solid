import { createSignal } from "solid-js";
import { PirateMidiDevice } from "pirate-midi-usb";

const [connected, setConnected] = createSignal<boolean>(false);
const [device, setDevice] = createSignal<PirateMidiDevice>();

export { connected, device };

const handleDisconnect = () => {
	setConnected(false);
};

const handleReconnect = () => {
	setConnected(true);
};

export const connect = async () => {
	let _device: PirateMidiDevice;
	try {
		// Dynamic import so Next picks the browser export
		const { getDevices } = await import("pirate-midi-usb");

		[_device] = await getDevices();
	} catch (error) {
		console.error(error);
		return;
	}

	setDevice(_device);
	setConnected(true);

	_device.on("disconnect", handleDisconnect);
	_device.on("connect", handleReconnect);
};

export const connectMock = async () => {
	// Dynamic import so Next picks the browser export
	const { getMockDevice } = await import("pirate-midi-usb");

	const { deviceInfo, globalSettings, bankSettings } = await import(
		"../fixtures/device"
	);

	const _device = await getMockDevice({
		deviceInfo,
		globalSettings,
		banks: Array(100).fill(bankSettings),
	});

	setDevice(_device);
	setConnected(true);
};

export const disconnect = () => {
	setDevice(undefined);
	setConnected(false);
};
