import { APIEvent, json } from "solid-start";

const TOKEN_ENDPOINT = `https://accounts.spotify.com/api/token`;

export async function GET() {
  const client_id = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
  const client_secret = import.meta.env.VITE_SPOTIFY_CLIENT_SECRET;
  const refresh_token: string = import.meta.env.VITE_SPOTIFY_REFRESH_TOKEN || "";
  const basic = btoa(`${client_id}:${client_secret}`);

  const req = await fetch(TOKEN_ENDPOINT, {
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

  const response: {
    access_token: string;
    token_type: string;
    expires_in: number;
    scope: string;
  } = await req.json();

  return json(response, 200);
}