const SPOTIFY_API_BASE_URL = `https://api.spotify.com/v1`;

export const SPOTIFY_API_URLS = {
	token: `https://accounts.spotify.com/api/token`,
	now_playing: `${SPOTIFY_API_BASE_URL}/me/player?additional_types=track,episode`,
	saved: `${SPOTIFY_API_BASE_URL}/me/tracks/contains`,
	pause: `${SPOTIFY_API_BASE_URL}/me/player/pause`,
	play: `${SPOTIFY_API_BASE_URL}/me/player/play`,
	previous: `${SPOTIFY_API_BASE_URL}/me/player/previous`,
	next: `${SPOTIFY_API_BASE_URL}/me/player/next`,
	shuffle: `${SPOTIFY_API_BASE_URL}/me/player/shuffle`,
};
