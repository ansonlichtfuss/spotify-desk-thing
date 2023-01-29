import { createVisibilityObserver } from "@solid-primitives/intersection-observer";
import { children, Component, ParentProps } from "solid-js";

export const CARD_SIZE = 715;

const Card: Component<ParentProps> = (props) => {
  let ref: HTMLDivElement;
  const isVisible = createVisibilityObserver({ threshold: 0.5 })(
    () => ref || undefined
  );

  return (
    <div
      ref={(el) => (ref = el)}
      class="relative bg-black text-white rounded-3xl overflow-hidden"
      style={{
        flex: "none",
        width: `${CARD_SIZE}px`,
        height: `${CARD_SIZE}px`,
        transform: `translateZ(0)`, // Fix for rounded corners in webkit
        "scroll-snap-align": "center",
      }}
    >
      {isVisible() && children(() => props.children)}
    </div>
  );
};

export default Card;
