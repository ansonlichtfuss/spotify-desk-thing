const redirect_uri = "http://localhost:3000/auth/callback";
const client_id = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
const scope =
  "streaming user-modify-playback-state user-read-playback-state user-read-currently-playing user-read-email user-read-playback-position user-read-private user-top-read user-library-read user-library-read";

export default function AuthInitialize() {
  const redirectURL =
    "https://accounts.spotify.com/authorize?" +
    new URLSearchParams({
      response_type: "code",
      client_id: client_id,
      scope: scope,
      redirect_uri: redirect_uri,
    });

  return <meta http-equiv="Refresh" content={`1; URL=${redirectURL}`} />;
}
