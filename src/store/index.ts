import { createStore } from "solid-js/store";

interface State {
	selectedBank: null | number;
	selectedFootswitch: null | number;
}

export const [state, setState] = createStore<State>({
	selectedBank: 0,
	selectedFootswitch: 1,
});
