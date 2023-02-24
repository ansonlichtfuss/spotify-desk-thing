import { children, Component, ParentProps } from "solid-js";

export const CARD_SIZE = 715;

const Card: Component<ParentProps> = (props) => {

  return (
    <div
      class="relative bg-black text-white rounded-3xl overflow-hidden"
      style={{
        flex: "none",
        width: `${CARD_SIZE}px`,
        height: `${CARD_SIZE}px`,
        transform: `translateZ(0)`, // Fix for rounded corners in webkit
        "scroll-snap-align": "center",
      }}
    >
      {children(() => props.children)}
    </div>
  );
};

export default Card;
