import { Component, ParentProps } from "solid-js";

interface Props extends ParentProps {
  src: string;
  isDisabled?: boolean;
  enlargeIcon?: boolean;
  onClick?: () => void;
}

const PlayerControlIcon: Component<Props> = (props) => {
  const dimensions = props.enlargeIcon ? 72 : 48;
  return (
    <button
      class={`hover:scale-125 ${!props.isDisabled ? "opacity-100" : "pointer-events-none opacity-25"
        }`}
      disabled={props.isDisabled}
      onClick={props.onClick}
    >
      <img src={props.src} width={dimensions} height={dimensions} />
    </button>
  );
};

export default PlayerControlIcon;
