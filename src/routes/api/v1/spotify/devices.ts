import { APIEvent, json } from "solid-start";

const DEVICES_ENDPOINT = `https://api.spotify.com/v1/me/player/devices`;

export async function GET({ params }: APIEvent) {
  const { access_token } = params;
  const response = await fetch(DEVICES_ENDPOINT, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });

  if (response.status === 200) {
    const json = await response.json();
    return json(json);
  } else {
    console.log("devices error", response);
    return json("an error happened and its a bummer");
  }
}