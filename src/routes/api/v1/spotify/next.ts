import { APIEvent, json } from "solid-start";
import { fetch } from "undici";

const NEXT_ENDPOINT = `https://api.spotify.com/v1/me/player/next`;

export async function POST({ request }: APIEvent) {
  const response = await fetch(NEXT_ENDPOINT, {
    method: "POST",
    headers: {
      Authorization: request.headers.get("Authorization") ?? "",
    },
  });

  if (response.status === 200 || response.status === 204) {
    return json({});
  } else {
    console.log("next error", response);
    return json("an error happened and its a bummer");
  }
}