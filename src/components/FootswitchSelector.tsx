import produce from "immer";
import { debounce } from "lodash-es";
import { Component } from "solid-js";
import { createGetBank, createUpdateBank } from "../resources/bank";
import { device } from "../services/device";
import { setState, state } from "../store";

const getBankNumber = () => state.selectedBank;

const Footswitch = ({ index }: { index: number }) => {
	const { switchNameLength } = device()!.getDeviceDescription();
	const [bank] = createGetBank(getBankNumber);
	const { mutateAsync } = createUpdateBank(getBankNumber);

	let inputRef;

	const onChange = debounce((event) => {
		const footswitches = produce(bank().footswitches, (fs) => {
			fs[index].name = event.target.value;
		});
		mutateAsync({ footswitches });
	}, 100);

	const onClick = () => {
		inputRef.focus();
		setState({ selectedFootswitch: index });
	};

	return (
		<div class="relative">
			<input
				ref={inputRef}
				type="text"
				placeholder="Footswitch name"
				class="w-full max-w-xs input input-bordered pl-14 rounded-full"
				classList={{
					"border-primary": state.selectedFootswitch === index,
				}}
				value={bank()?.footswitches[index].name}
				maxLength={switchNameLength}
				onInput={onChange}
				onClick={onClick}
				onFocus={onClick}
			/>
			<button
				type="button"
				classList={{
					"btn-primary": state.selectedFootswitch === index,
				}}
				class="btn btn-circle absolute left-0"
				onClick={onClick}
			>
				{index + 1}
			</button>
		</div>
	);
};

export const FootswitchSelector: Component = () => {
	const {
		hardware: { footswitches },
	} = device()!.getDeviceDescription();

	return (
		<div
			classList={{
				["grid-cols-3"]: footswitches === 6,
				["grid-cols-2"]: footswitches !== 6,
			}}
			class="inline-grid gap-3"
		>
			{Array(footswitches)
				.fill(undefined)
				.map((_, index) => index)
				.sort((a, b) => {
					// Sort top row to top
					const aTop = a > (footswitches - 1) / 2;
					const bTop = b > (footswitches - 1) / 2;
					if (aTop === bTop) return 0;
					return -1;
				})
				.map((footSwitchIndex) => (
					<Footswitch index={footSwitchIndex} />
				))}
		</div>
	);
};
