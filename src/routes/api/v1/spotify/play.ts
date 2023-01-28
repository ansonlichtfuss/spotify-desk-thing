import { APIEvent, json } from "solid-start";
import { fetch } from "undici";

const PLAY_ENDPOINT = `https://api.spotify.com/v1/me/player/play`;

export async function POST({ request }: APIEvent) {
  const response = await fetch(PLAY_ENDPOINT, {
    method: "PUT",
    headers: {
      Authorization: request.headers.get("Authorization") ?? "",
    },
  });

  if (response.status === 200 || response.status === 204) {
    return json({ is_playing: true });
  } else if (response.status === 404) {
    return json({ is_playing: false });
  } else {
    console.log("play error", response);
    return json("an error happened and its a bummer");
  }
}