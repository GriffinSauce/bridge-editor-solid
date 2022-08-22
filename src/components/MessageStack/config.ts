import {
	FlexiPart,
	MidiMessageType,
	SmartMessageType,
	SwitchSide,
} from "pirate-midi-usb";
import {
	AiOutlineLogin,
	AiOutlineArrowDown,
	AiOutlineArrowUp,
	AiOutlineVerticalAlignBottom,
	AiOutlineToTop,
} from "solid-icons/ai";
import { FiChevronsRight, FiToggleRight, FiToggleLeft } from "solid-icons/fi";

export const messageStacks = {
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

export type MessageStackType = keyof typeof messageStacks;

export const messageStackTypes = Object.keys(
	messageStacks,
) as MessageStackType[];

interface MessageConfig {
	title: string;
	fields: string[];
}

export const messages: Record<MidiMessageType, MessageConfig> = {
	NoteOn: {
		title: "Note On",
		fields: ["channel", "octave", "note", "velocity"],
	},
	NoteOff: {
		title: "Note Off",
		fields: ["channel", "octave", "note", "velocity"],
	},
	PolyPressure: {
		title: "Note Off",
		fields: ["channel", "octave", "note", "velocity"],
	},
	ControlChange: {
		title: "Control Change",
		fields: ["channel", "control", "value"],
	},
	ProgramChange: {
		title: "Program Change",
		fields: ["channel", "number"],
	},
	ChannelPressure: {
		title: "Channel Pressure",
		fields: ["channel", "number"],
	},
	PitchBend: {
		title: "Pitch Bend",
		fields: ["channel", "octave", "note", "pitch"],
	},
	SmartMessage: {
		title: "Smart Message",
		fields: ["smartType"],
	},
};

export const noteOptions = [
	{ label: "C", value: "C" },
	{ label: "C#/Db", value: "C#/Db" },
	{ label: "D", value: "D" },
	{ label: "D#/Eb", value: "D#/Eb" },
	{ label: "E", value: "E" },
	{ label: "F", value: "F" },
	{ label: "F#/Gb", value: "F#/Gb" },
	{ label: "G", value: "G" },
	{ label: "G#/Ab", value: "G#/Ab" },
	{ label: "A", value: "A" },
	{ label: "A#/Bb", value: "A#/Bb" },
	{ label: "B", value: "B" },
];

export const smartMessages: Array<{
	label: string;
	type: SmartMessageType;
	fields: string[];
}> = [
	{
		label: "Switch on",
		type: SmartMessageType.SwitchOn,
		fields: ["switchIndex", "side"],
	},
	{
		label: "Switch off",
		type: SmartMessageType.SwitchOff,
		fields: ["switchIndex", "side"],
	},
	{
		label: "Switch toggle",
		type: SmartMessageType.SwitchToggle,
		fields: ["switchIndex", "side"],
	},
	{
		label: "Sequential reset step",
		type: SmartMessageType.SequentialResetStep,
		fields: ["switchIndex"],
	},
	{
		label: "Sequential increment step",
		type: SmartMessageType.SequentialIncrementStep,
		fields: ["switchIndex"],
	},
	{
		label: "Sequential decrement step",
		type: SmartMessageType.SequentialDecrementStep,
		fields: ["switchIndex"],
	},
	{
		label: "Sequential go to step",
		type: SmartMessageType.SequentialGoToStep,
		fields: ["switchIndex"],
	},
	{
		label: "Sequential queue next step",
		type: SmartMessageType.SequentialQueueNextStep,
		fields: ["switchIndex"],
	},
	{
		label: "Sequential queue step",
		type: SmartMessageType.SequentialQueueStep,
		fields: ["switchIndex"],
	},
	{
		label: "Scrolling reset step",
		type: SmartMessageType.ScrollingResetStep,
		fields: ["switchIndex"],
	},
	{
		label: "Scrolling increment step",
		type: SmartMessageType.ScrollingIncrementStep,
		fields: ["switchIndex"],
	},
	{
		label: "Scrolling decrement step",
		type: SmartMessageType.ScrollingDecrementStep,
		fields: ["switchIndex", "stepIndex"],
	},
	{
		label: "Scrolling go to step",
		type: SmartMessageType.ScrollingGoToStep,
		fields: ["switchIndex", "stepIndex"],
	},
	{
		label: "Scrolling queue next step",
		type: SmartMessageType.ScrollingQueueNextStep,
		fields: ["switchIndex", "stepIndex"],
	},
	{
		label: "Scrolling queue step",
		type: SmartMessageType.ScrollingQueueStep,
		fields: ["switchIndex", "stepIndex"],
	},
	{ label: "Bank up", type: SmartMessageType.BankUp, fields: [] },
	{ label: "Bank down", type: SmartMessageType.BankDown, fields: [] },
	{
		label: "Go to bank",
		type: SmartMessageType.GoToBank,
		fields: ["bankIndex"],
	},
	{
		label: "Increment exp step",
		type: SmartMessageType.IncrementExpStep,
		fields: ["expIndex"],
	},
	{
		label: "Decrement exp step",
		type: SmartMessageType.DecrementExpStep,
		fields: ["expIndex"],
	},
	{
		label: "Go to exp step",
		type: SmartMessageType.GoToExpStep,
		fields: ["expIndex", "stepIndex"],
	},
	{
		label: "Trs switch out",
		type: SmartMessageType.TrsSwitchOut,
		fields: ["flexiPort", "part"],
	},
	{
		label: "Trs pulse out",
		type: SmartMessageType.TrsPulseOut,
		fields: ["flexiPort", "part"],
	},
];

export const smartTypeOptions = smartMessages.map(({ label, type }) => ({
	label,
	value: type,
}));

export const smartMessageFields = smartMessages.reduce(
	(fieldsMap, { type, fields }) => {
		fieldsMap[type] = fields;
		return fieldsMap;
	},
	{},
);

export const switchSideOptions = [
	{
		label: "Primary",
		value: SwitchSide.Primary,
	},
	{
		label: "Secondary",
		value: SwitchSide.Secondary,
	},
];

export const flexiPartOptions = [
	{ label: "None", value: FlexiPart.None },
	{ label: "Tip", value: FlexiPart.Tip },
	{ label: "Ring", value: FlexiPart.Ring },
	{ label: "Tip + Ring", value: FlexiPart.TipRing },
];
