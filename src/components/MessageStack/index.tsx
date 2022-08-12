import { Component, For } from "solid-js";
import { AiOutlinePlus } from "solid-icons/ai";
import { state } from "../../store";
import { createGetBank } from "../../resources/bank";
import { configs, MessageType } from "./config";

const getBankNumber = () => state.selectedBank;

interface Props {
  type: MessageType;
}

export const MessageStack: Component<Props> = ({ type }) => {
  const [bank] = createGetBank(getBankNumber);
  const key = `${type}Messages`;
  const Icon = configs[type].icon;

  return (
    <div class="[flex-basis:12rem] flex-shrink-0 flex flex-col gap-2">
      <div class="p-3 flex items-center rounded-lg bg-base-300 font-semibold gap-3">
        <Icon />
        <span>{configs[type].title}</span>
      </div>

      <For
        each={
          bank().footswitches[state.selectedFootswitch]?.[key]?.messages || []
        }
      >
        {(item) => JSON.stringify(item, null, 2)}
      </For>

      <button class="btn flex items-center justify-center no-animation">
        <AiOutlinePlus />
      </button>
    </div>
  );
};
