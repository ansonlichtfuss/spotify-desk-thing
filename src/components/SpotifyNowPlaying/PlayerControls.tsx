import { Component } from "solid-js";
import SvgEmptyHeart from "./icons/bx-heart.svg";
import SvgHeart from "./icons/bxs-heart.svg";
import SvgPause from "./icons/bx-pause.svg";
import SvgPlay from "./icons/bx-play.svg";
import SvgShuffle from "./icons/bx-shuffle.svg";
import SvgSkipNext from "./icons/bx-skip-next.svg";
import SvgSkipPrevious from "./icons/bx-skip-previous.svg";
import PlayerControlIcon from "./PlayerControlIcon";

const PlayerControls: Component = () => {
  return (
    <div
      class="fixed w-full left-0 bottom-0 flex items-center justify-between px-10"
      style={{
        "background-color": "rgba(0,0,0,0.2)",
        height: "75px",
        "align-items": "center",
      }}
    >
      <PlayerControlIcon src={SvgShuffle} />
      <PlayerControlIcon src={SvgSkipPrevious} enlargeIcon={true} />
      <PlayerControlIcon src={SvgPlay} enlargeIcon={true} />
      <PlayerControlIcon src={SvgSkipNext} enlargeIcon={true} />
      <PlayerControlIcon src={SvgEmptyHeart} />
    </div>
  );
};

export default PlayerControls;
