import { Component, createSignal } from "solid-js";
import Card, { CARD_SIZE } from "./Card";
import Clock from "./Clock/Clock";
import SpotifyNowPlaying from "./SpotifyNowPlaying/SpotifyNowPlaying";
const INITIAL_INDEX = 0;

const Carousel: Component = () => {
  const [activeIndex, setActiveIndex] = createSignal(INITIAL_INDEX);
  console.log("hey tiff Carousel render");

  return (
    <div class="flex items-center justify-center w-screen h-screen bg-black text-white">
      <div
        class="relative overflow-x-scroll flex"
        style={{ flex: "none", width: `${CARD_SIZE}px`, height: `${CARD_SIZE}px`, "scroll-snap-type": "x mandatory" }}
      >
        <Card>
          <Clock />
        </Card>
        <Card>
          <SpotifyNowPlaying />
        </Card>
      </div>
    </div>
  );
};

export default Carousel;
