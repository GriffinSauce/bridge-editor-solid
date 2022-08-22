import { MidiMessageType } from "pirate-midi-usb";
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

interface MessageConfig {
	title: string;
	fields: Record<string, { label: string }>;
}

export const midiMessages: Record<MidiMessageType, MessageConfig> = {
	NoteOn: {
		title: "Note On",
		fields: {
			channel: {
				label: "Channel",
			},
			number: {
				label: "Note",
			},
			value: {
				label: "Velocity",
			},
		},
	},
	NoteOff: {
		title: "Note Off",
		fields: {
			channel: {
				label: "Channel",
			},
			number: {
				label: "Note",
			},
			value: {
				label: "Velocity",
			},
		},
	},
	PolyPressure: {
		title: "Note Off",
		fields: {
			channel: {
				label: "Channel",
			},
			number: {
				label: "Note",
			},
			value: {
				label: "Velocity",
			},
		},
	},
	ControlChange: {
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
	ProgramChange: {
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
	ChannelPressure: {
		title: "Channel Pressure",
		fields: {
			channel: {
				label: "Channel",
			},
			number: {
				label: "Pressure",
			},
		},
	},
	PitchBend: {
		title: "Pitch Bend",
		fields: {
			channel: {
				label: "Channel",
			},
			number: {
				label: "Pitch bend",
			},
		},
	},
	SmartMessage: {
		title: "Smart Message",
		fields: {},
	},
};
