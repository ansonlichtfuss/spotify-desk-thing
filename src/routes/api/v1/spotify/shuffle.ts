import { APIEvent, json } from "solid-start";
import { fetch } from "undici";

const SHUFFLE_ENDPOINT = `https://api.spotify.com/v1/me/player/shuffle`;

export async function PUT({ request }: APIEvent) {
  const searchParams = (new URL(request.url)).searchParams;
  const response = await fetch(`${SHUFFLE_ENDPOINT}?` + new URLSearchParams({
    state: `${searchParams.get('state')}`
  }), {
    method: "PUT",
    headers: {
      Authorization: request.headers.get("Authorization") ?? "",
    },
  });

  if (response.status === 200 || response.status === 204) {
    return json({});
  } else {
    console.log("previous error", response);
    return json("an error happened and its a bummer");
  }
}