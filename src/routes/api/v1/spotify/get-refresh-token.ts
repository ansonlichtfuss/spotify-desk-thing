import { APIEvent } from "@solidjs/start/server";
import { json } from "@solidjs/router";
import fetch from "cross-fetch";

const TOKEN_ENDPOINT = `https://accounts.spotify.com/api/token`;
const redirect_uri = "http://localhost:3000/auth/callback";

export async function GET({ request }: APIEvent) {
  const searchParams = new URL(request.url).searchParams;

  try {
    const client_id = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
    const client_secret = import.meta.env.VITE_SPOTIFY_CLIENT_SECRET;
    const basic = btoa(`${client_id}:${client_secret}`);

    const res = await fetch(TOKEN_ENDPOINT, {
      method: "POST",
      headers: {
        Authorization: `Basic ${basic}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        code: searchParams.get("code")?.toString() || "",
        redirect_uri: redirect_uri,
        grant_type: "authorization_code",
      }),
    });

    const response = await res.json();

    return json(response, { status: 200 });
  } catch (e) {
    return json(e, { status: 500 });
  }
}
