import { APIEvent, json } from "solid-start";
import fetch from "cross-fetch";

const TOKEN_ENDPOINT = `https://accounts.spotify.com/api/token`;

export async function GET() {
  try {
    const client_id = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
    const client_secret = import.meta.env.VITE_SPOTIFY_CLIENT_SECRET;
    const refresh_token: string =
      import.meta.env.VITE_SPOTIFY_REFRESH_TOKEN || "";
    const basic = btoa(`${client_id}:${client_secret}`);

    const res = await fetch(TOKEN_ENDPOINT, {
      method: "POST",
      headers: {
        Authorization: `Basic ${basic}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        grant_type: "refresh_token",
        refresh_token,
      }),
    });

    const response = await res.json();

    return json(response, 200);
  } catch (e) {
    return json(e, 500);
  }
}
