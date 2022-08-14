import {
	AiOutlineLogin,
	AiOutlineArrowDown,
	AiOutlineArrowUp,
	AiOutlineVerticalAlignBottom,
	AiOutlineToTop,
} from "solid-icons/ai";
import { FiChevronsRight, FiToggleRight, FiToggleLeft } from "solid-icons/fi";

export const messages = {
	bank: {
		title: "Bank",
		icon: AiOutlineLogin,
	},
	press: {
		title: "Press",
		icon: AiOutlineArrowDown,
	},
	release: {
		title: "Release",
		icon: AiOutlineArrowUp,
	},
	doublePress: {
		title: "Double press",
		icon: FiChevronsRight,
	},
	hold: {
		title: "Hold",
		icon: AiOutlineVerticalAlignBottom,
	},
	holdRelease: {
		title: "Hold release",
		icon: AiOutlineToTop,
	},
	toggleOn: {
		title: "Toggle on",
		icon: FiToggleRight,
	},
	toggleOff: {
		title: "Toggle off",
		icon: FiToggleLeft,
	},
	secondaryToggleOn: {
		title: "2nd toggle on",
		icon: FiToggleRight,
	},
	secondaryToggleOff: {
		title: "2nd toggle off",
		icon: FiToggleLeft,
	},
};

export type MessageType = keyof typeof messages;

export const messageTypes = Object.keys(messages) as MessageType[];

export const midiMessages = {
	noteon: {
		title: "Note On",
		fields: {},
	},
	noteoff: {
		title: "Note Off",
		fields: {},
	},
	keypressure: {
		title: "Key Pressure",
		fields: {},
	},
	controlchange: {
		title: "Control Change",
		fields: {
			channel: {
				label: "Channel",
			},
			number: {
				label: "Control",
			},
			value: {
				label: "Value",
			},
		},
	},
	programchange: {
		title: "Program Change",
		fields: {
			channel: {
				label: "Channel",
			},
			number: {
				label: "Number",
			},
		},
	},
	channelpressure: {
		title: "Channel Pressure",
		fields: {},
	},
	pitchbend: {
		title: "Pitch Bend",
		fields: {},
	},
	unknown: {
		title: "Unknown",
		fields: {},
	},
};
