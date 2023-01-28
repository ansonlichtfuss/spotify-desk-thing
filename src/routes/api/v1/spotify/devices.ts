import { APIEvent, json } from "solid-start";
import { fetch } from "undici";

const DEVICES_ENDPOINT = `https://api.spotify.com/v1/me/player/devices`;

export async function GET({ request }: APIEvent) {
  const response = await fetch(DEVICES_ENDPOINT, {
    headers: {
      Authorization: request.headers.get("Authorization") ?? "",
    },
  });

  if (response.status === 200) {
    const body = await response.json();
    return json(body);
  } else {
    console.log("devices error", response);
    return json("an error happened and its a bummer");
  }
}