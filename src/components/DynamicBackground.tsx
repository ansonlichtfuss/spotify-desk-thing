import {
  children,
  Component,
  createEffect,
  createSignal,
  ParentProps,
} from "solid-js";
import { extractColors } from "extract-colors";

const TARGET_LIGHTNESS = 0.3;
const DEFAULT_ACCENT_COLOR = "#111111";

interface DynamicBackgroundType extends ParentProps {
  imgUrl?: string;
}

const DynamicBackground: Component<DynamicBackgroundType> = (props) => {
  const [accentColor, setAccentColor] = createSignal(DEFAULT_ACCENT_COLOR);

  createEffect(() => {
    if (props.imgUrl) {
      extractColors(props.imgUrl, {
        crossOrigin: "anonymous",
        lightnessDistance: 0.1,
      })
        .then((colors) => {
          let closestToDarkish = 10;
          let bestIndex = 0;
          colors.forEach((color, index) => {
            const lightnessDifferent = Math.abs(
              color.lightness - TARGET_LIGHTNESS
            );
            if (lightnessDifferent < closestToDarkish) {
              closestToDarkish = lightnessDifferent;
              bestIndex = index;
            }
          });
          setAccentColor(colors[bestIndex].hex);
        })
        .catch(console.error);
    } else {
      // setAccentColor(DEFAULT_ACCENT_COLOR);
    }
  });

  return (
    <div
      class="h-full w-full top-0 left-0 p-12 bg-black fixed text-white"
      style={{
        "background-color": `${accentColor()}`,
      }}
    >
      {children(() => props.children)()}
    </div>
  );
};

export default DynamicBackground;
