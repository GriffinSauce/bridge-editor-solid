import {
	AiOutlineLogin,
	AiOutlineArrowDown,
	AiOutlineArrowUp,
	AiOutlineVerticalAlignBottom,
	AiOutlineToTop,
	AiOutlineStepForward,
} from "solid-icons/ai";
import { FiChevronsRight, FiToggleRight, FiToggleLeft } from "solid-icons/fi";

export const configs = {
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
		title: "Secondary toggle on",
		icon: FiToggleRight,
	},
	secondaryToggleOff: {
		title: "Secondary toggle off",
		icon: FiToggleLeft,
	},
	numSequential: {
		title: "Sequential",
		icon: AiOutlineStepForward,
	},
};

export type MessageType = keyof typeof configs;

export const messageTypes = Object.keys(configs) as MessageType[];
