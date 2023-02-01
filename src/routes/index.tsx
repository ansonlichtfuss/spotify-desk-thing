import { A } from "solid-start";
import Carousel from "~/components/Carousel";
import { SpotifyAuthProvider } from "~/components/context/SpotifyAuthContext";

export default function Home() {
  return (
    <main style={{ "font-family": "Inter" }}>
      <SpotifyAuthProvider>
        <Carousel />
      </SpotifyAuthProvider>
    </main>
  );
}
