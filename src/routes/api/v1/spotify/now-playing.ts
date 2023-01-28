import { APIEvent, json } from "solid-start";
import { Response, fetch } from "undici";

const NOW_PLAYING_ENDPOINT = `https://api.spotify.com/v1/me/player?additional_types=track,episode`;

export async function GET({ request }: APIEvent) {
  try {
    const res: Response = await fetch(NOW_PLAYING_ENDPOINT, {
      headers: {
        Authorization: request.headers.get("Authorization") ?? "",
      },
    });

    console.log('hey tiff now playing', res.status)

    if (res.status === 200) {
      const body: any = await res.json();
      console.log('hey tiff now playing json', body)

      return json(body);
    } else if (res.status === 204) {
      return json({ is_playing: false });
    }
  } catch (e) {
    console.log("nowPlaying error", e);
    return json("an error happened and its a bummer");
  }
}