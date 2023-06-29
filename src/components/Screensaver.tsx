import {
  children,
  Component,
  createEffect,
  createSignal,
  ParentProps,
} from "solid-js";
import { extractColors } from "extract-colors";
import SvgSpotifyWhite from "./icons/spotify-white.svg";


const Screensaver: Component = (props) => {
  return (
    <div
      class="w-full h-full bg-black flex items-center justify-center"
    >
      <img class="opacity-25" src={SvgSpotifyWhite} width={"150"} height={"150"} />
    </div>
  );
};

export default Screensaver;
