import { NowPlayingContextProvider } from "~/components/context/NowPlayingContext";
import SpotifyNowPlaying from "~/components/SpotifyNowPlaying";
import { redirect } from "solid-start/server";
import { APIEvent, json } from "solid-start";
import fetch from "cross-fetch";
import { createEffect, createSignal } from "solid-js";

const TOKEN_ENDPOINT = `https://accounts.spotify.com/api/token`;
const redirect_uri = 'http://localhost:3000/auth/callback';

export default function AuthCallback() {
  const code = (new URL(window.location.href)).searchParams.get('code') || '';

  const [refreshToken, setRefreshToken] = createSignal('loading...');

  createEffect(() => {
    async function doTheThing() {
      const res = await fetch('/api/v1/spotify/get-refresh-token?' + new URLSearchParams({
        code
      }), {
        method: "GET",
      });

      const response = await res.json();
      setRefreshToken(JSON.stringify(response));
    }

    doTheThing();
  });

  const searchParams = (new URL(window.location.href)).searchParams;
  return (
    <div>Copy this into the 'VITE_SPOTIFY_REFRESH_TOKEN' field in the .env file:<p>{searchParams.get('code')}</p>
      <p>-----</p>
      <p>{refreshToken()}</p></div>
  );
}
