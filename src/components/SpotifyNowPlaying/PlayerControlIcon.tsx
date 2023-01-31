import { Component, ParentProps } from "solid-js";

interface Props extends ParentProps {
  src: string;
  isDisabled?: boolean;
  enlargeIcon?: boolean;
  showActiveIndicator?: boolean;
  onClick?: () => void;
}

const PlayerControlIcon: Component<Props> = (props) => {
  const dimensions = props.enlargeIcon ? 72 : 48;
  return (
    <button
      class={`hover:scale-125 relative ${!props.isDisabled ? "opacity-100" : "pointer-events-none opacity-25"
        }`}
      disabled={props.isDisabled}
      onClick={props.onClick}
    >
      <img src={props.src} width={dimensions} height={dimensions} />
      {props.showActiveIndicator && <span class="absolute -bottom-1 left-1/2 text-2xl w-2 h-3 -ml-2">&#x25CF;</span>}
    </button>
  );
};

export default PlayerControlIcon;
