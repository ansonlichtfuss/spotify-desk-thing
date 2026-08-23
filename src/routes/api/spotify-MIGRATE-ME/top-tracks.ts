import { APIEvent } from "@solidjs/start/server";
import { json } from "@solidjs/router";
import { fetch } from "undici";

const TOP_TRACKS_ENDPOINT = `https://api.spotify.com/v1/me/top/tracks`;

export async function GET({ request }: APIEvent) {
  const response = await fetch(TOP_TRACKS_ENDPOINT, {
    headers: {
      Authorization: request.headers.get("Authorization") ?? "",
    },
  });

  if (response.status === 200) {
    const body = await response.json();
    return json(body, { status: 200 });
  } else {
    console.log("topTracks error", response);
    return json("an error happened and its a bummer");
  }
}
