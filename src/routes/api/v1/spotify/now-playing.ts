import { APIEvent, json } from "solid-start";
import fetch from "cross-fetch";

const NOW_PLAYING_ENDPOINT = `https://api.spotify.com/v1/me/player?additional_types=track,episode`;

export async function GET({ request }: APIEvent) {
  try {
    const res = await fetch(NOW_PLAYING_ENDPOINT, {
      headers: {
        Authorization: request.headers.get("Authorization") ?? "",
      },
    });

    const status = res.status;
    if (status === 403) {
      return json(await res.text(), 403)
    }

    if (status === 200) {
      return json(await res.json());
    } else if (status === 204) {
      return json({ is_playing: false });
    } else {
      return json(await res.json(), status)
    }
  } catch (e) {
    console.log("nowPlaying error", e);
    return json(e);
  }
}