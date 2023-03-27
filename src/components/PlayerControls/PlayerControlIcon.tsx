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
      class={`group relative ${!props.isDisabled ? "opacity-100" : "pointer-events-none opacity-25"
        }`}
      disabled={props.isDisabled}
      onClick={props.onClick}
    >
      <img class="group-hover:scale-105 " src={props.src} width={dimensions} height={dimensions} />
      {props.showActiveIndicator && <span class="absolute -bottom-4 left-1/2 bg-white rounded-full" style={{ width: "10px", height: "10px", "margin-left": "-5px" }}></span>}
    </button>
  );
};

export default PlayerControlIcon;
