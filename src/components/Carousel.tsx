import { Component, createSignal } from "solid-js";
import Card, { CARD_SIZE } from "./Card";
import SpotifyNowPlaying from "./SpotifyNowPlaying/SpotifyNowPlaying";

const Carousel: Component = () => {
  return (
    <div class="flex items-center justify-center w-screen h-screen bg-black text-white">
      <div
        class="relative flex"
        style={{ flex: "none", width: `${CARD_SIZE}px`, height: `${CARD_SIZE}px` }}
      >
        <Card>
          <SpotifyNowPlaying />
        </Card>
      </div>
    </div>
  );
};

export default Carousel;
