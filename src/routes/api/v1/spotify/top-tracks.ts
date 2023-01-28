import { APIEvent, json } from "solid-start";

const TOP_TRACKS_ENDPOINT = `https://api.spotify.com/v1/me/top/tracks`;

export async function GET({ params }: APIEvent) {
  const { access_token } = params;
  const response = await fetch(TOP_TRACKS_ENDPOINT, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });

  if (response.status === 200) {
    const json = await response.json();
    return json(json);
  } else {
    console.log("topTracks error", response);
    return json("an error happened and its a bummer");
  }
}