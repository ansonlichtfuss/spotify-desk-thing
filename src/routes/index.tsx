import { A } from "solid-start";
import { SpotifyAuthProvider } from "~/components/context/SpotifyAuthContext";
import SpotifyNowPlaying from "~/components/SpotifyNowPlaying/SpotifyNowPlaying";

const CARD_SIZE = 715;

export default function Home() {
  return (
    <main>
      <SpotifyAuthProvider>
        <div class="flex items-center justify-center w-screen h-screen bg-black text-white">
          <div
            class="relative flex"
            style={{ flex: "none", width: `${CARD_SIZE}px`, height: `${CARD_SIZE}px` }}
          >
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
              <SpotifyNowPlaying />
            </div>
          </div>
        </div>
      </SpotifyAuthProvider>
    </main>
  );
}
