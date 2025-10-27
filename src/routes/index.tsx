import { createEffect, createSignal } from "solid-js";
import SpotifyNowPlaying from "~/components/SpotifyNowPlaying";
import {
  getAuthTokenSignal,
  useSpotifyAuth,
} from "~/components/hooks/useSpotifyAuth";

const CARD_SIZE = 715;

export default function Home() {
  useSpotifyAuth();
  const [isAuthenticated, setIsAuthenticated] = createSignal(false);
  const [showAuthError, setShowAuthError] = createSignal(false);

  createEffect(() => {
    let timerReference = null;

    // Wait a little bit, then if we're still not authenticated show an error
    timerReference = setTimeout(() => {
      if (!getAuthTokenSignal?.()) {
        setShowAuthError(true);
      }
    }, 2000);

    // Check to see if we're authenticated
    if (getAuthTokenSignal?.() && getAuthTokenSignal?.().length > 0) {
      clearTimeout(timerReference);
      setIsAuthenticated(true);
      setShowAuthError(false);
    }

    return () => {
      if (timerReference) clearTimeout(timerReference);
    };
  });

  return (
    <main>
      {isAuthenticated() && (
        <div class="flex items-center justify-center w-screen h-screen text-white">
          <div
            class="relative flex"
            style={{
              flex: "none",
              width: `${CARD_SIZE}px`,
              height: `${CARD_SIZE}px`,
            }}
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
      {showAuthError() && (
        <div class="grid items-center justify-center h-screen">
          <p class="text-white text-center max-w-sm">
            Unable to authenticate with API. Have you set the proper auth tokens
            in the ".env" configuration file? (see README for setup
            instructions)
          </p>
        </div>
      )}
    </main>
  );
}
