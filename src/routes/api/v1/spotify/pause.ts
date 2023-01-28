import { APIEvent, json } from "solid-start";

const PAUSE_ENDPOINT = `https://api.spotify.com/v1/me/player/pause`;

export async function POST({ params }: APIEvent) {
  const { access_token } = params;
  const response = await fetch(PAUSE_ENDPOINT, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });

  if (response.status === 200 || response.status === 204) {
    return json({ is_playing: false });
  } else if (response.status === 404) {
    return json(JSON.stringify({ is_playing: false }));
  } else {
    console.log("pause error", response);
    return json("an error happened and its a bummer");
  }
}