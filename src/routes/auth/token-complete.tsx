import { NowPlayingContextProvider } from "~/components/context/NowPlayingContext";
import SpotifyNowPlaying from "~/components/SpotifyNowPlaying";


export default function TokenComplete() {
  const searchParams = (new URL(window.location.href)).searchParams;
  return (
    <div>Copy this into the 'VITE_SPOTIFY_REFRESH_TOKEN' field in the .env file:<p>{searchParams.get('code')}</p></div>
  );
}
