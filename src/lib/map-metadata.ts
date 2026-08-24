import type { UiMetadata } from "./types";

const getAlbumMetadata = ({ album, name }: SpotifyApi.TrackObjectFull) => ({
	preview: album.images[0].url,
	title: name,
	subtitle: album.artists.map((artist) => artist.name).join(", "),
});

const getEpisodeMetadata = (episode: SpotifyApi.EpisodeObject) => ({
	preview: episode.images[0].url,
	title: episode.name,
	subtitle: episode.show.name,
});

const defaultScreensaverMetadata: UiMetadata = {
	preview: "",
	title: "",
	subtitle: "",
	missingNowPlayingContext: true,
	showScreensaver: true,
};

export function mapTrackMetadata(
	item:
		| SpotifyApi.TrackObjectFull
		| SpotifyApi.EpisodeObject
		| null
		| undefined,
): UiMetadata {
	if (!item) return defaultScreensaverMetadata;

	if ("album" in item) {
		return { ...getAlbumMetadata(item), showScreensaver: false };
	}

	if ("show" in item) {
		return { ...getEpisodeMetadata(item), showScreensaver: false };
	}

	return defaultScreensaverMetadata;
}
