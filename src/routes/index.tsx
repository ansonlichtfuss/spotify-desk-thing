// import { NowPlayingContextProvider } from "~/components/context/NowPlayingContext";
import SpotifyNowPlaying from "~/components/SpotifyNowPlaying";
import { getAuthTokenSignal, useSpotifyAuth } from "~/components/hooks/useSpotifyAuth";
import { trpc } from "~/utils/trpc";

const CARD_SIZE = 715;

export default function Home() {
  useSpotifyAuth();

  return (
    <main>
      {getAuthTokenSignal().length > 0 && (
        <div class="flex items-center justify-center w-screen h-screen text-white">
          <div
            class="relative flex"
            style={{ flex: "none", width: `${CARD_SIZE}px`, height: `${CARD_SIZE}px` }}
          >
            <div
              class="relative text-white rounded-3xl overflow-hidden"
              style={{
                flex: "none",
                width: `${CARD_SIZE}px`,
                height: `${CARD_SIZE}px`,
                transform: `translateZ(0)`, // Fix for rounded corners in webkit
                "scroll-snap-align": "center",
              }}
            >
              <SpotifyNowPlaying />
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
