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
      <img class="opacity-50" src={SvgSpotifyWhite} width={"250"} height={"250"} />
    </div>
  );
};

export default Screensaver;
