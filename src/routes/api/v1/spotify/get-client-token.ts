import { APIEvent, json } from "solid-start";
import { redirect } from "solid-start/server";

const redirect_uri = 'http://localhost:3000/auth/callback';
const client_id = import.meta.env.VITE_SPOTIFY_CLIENT_ID;

export async function GET({ request }: APIEvent) {
  const state = Math.random().toString(36).substr(2, 5) + 'poop';
  const scope = 'streaming user-modify-playback-state user-read-playback-state user-read-currently-playing user-read-email user-read-playback-position user-read-private user-top-read user-library-read user-library-read';

  return redirect('https://accounts.spotify.com/authorize?' +
    new URLSearchParams({
      response_type: 'code',
      client_id: client_id,
      scope: scope,
      redirect_uri: redirect_uri,
      // state: state
    }));
}