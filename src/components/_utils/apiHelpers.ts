const baseSpotifyApiUrl = `/api/v1/spotify`;
const buildAuthUrl = (route: string) => `${baseSpotifyApiUrl}${route}`;

export const getSpotifyAccessToken = async (): Promise<any> => {
  const response = await fetch(`${baseSpotifyApiUrl}/access-token`);
  return await response.json();
};

export const getSpotifyNowPlaying = async (
  access_token: string
): Promise<SpotifyApi.CurrentPlaybackResponse> => {
  const response = await fetch(buildAuthUrl(`/now-playing`), {
    method: "GET",
    headers: new Headers({
      Authorization: `Bearer ${access_token}`,
    }),
  });
  return await response.json();
};

export const setSpotifyPause = async (access_token: string) => {
  const response = await fetch(buildAuthUrl(`/pause`), {
    method: "POST",
    headers: new Headers({
      Authorization: `Bearer ${access_token}`,
    }),
  });
  return await response.json();
};

export const setSpotifyPlay = async (access_token: string) => {
  const response = await fetch(buildAuthUrl(`/play`), {
    method: "POST",
    headers: new Headers({
      Authorization: `Bearer ${access_token}`,
    }),
  });
  return await response.json();
};

export const setSpotifyPrevious = async (access_token: string) => {
  const response = await fetch(buildAuthUrl(`/previous`), {
    method: "POST",
    headers: new Headers({
      Authorization: `Bearer ${access_token}`,
    }),
  });
  return await response.json();
};

export const setSpotifyNext = async (access_token: string) => {
  const response = await fetch(buildAuthUrl(`/next`), {
    method: "POST",
    headers: new Headers({
      Authorization: `Bearer ${access_token}`,
    }),
  });
  return await response.json();
};

export const setSpotifyShuffle = async (access_token: string, state: boolean) => {
  const response = await fetch(buildAuthUrl(`/shuffle`) + `?` + new URLSearchParams({
    state: state ? 'true' : 'false'
  }), {
    method: "PUT",
    headers: new Headers({
      Authorization: `Bearer ${access_token}`,
    }),
  });
  return await response.json();
};
