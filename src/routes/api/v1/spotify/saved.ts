import { APIEvent, json } from "solid-start";
import { fetch } from "undici";

const SAVED_ENDPOINT = `https://api.spotify.com/v1/me/tracks/contains`;

export async function GET({ request }: APIEvent) {
  const searchParams = (new URL(request.url)).searchParams;

  console.log('hey tiff', `${SAVED_ENDPOINT}?` + new URLSearchParams({
    ids: `${searchParams.get('ids')}`
  }));
  const response = await fetch(`${SAVED_ENDPOINT}?` + new URLSearchParams({
    ids: `${searchParams.get('ids')}`
  }), {
    method: "GET",
    headers: {
      Authorization: request.headers.get("Authorization") ?? "",
    },
  });

  if (response.status === 200 || response.status === 204) {
    const body = await response.json();
    return json(body);
  } else {
    console.log("previous error", response);
    return json("an error happened and its a bummer");
  }
}