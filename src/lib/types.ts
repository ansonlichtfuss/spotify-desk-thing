export interface AlbumMetadata {
	images: { url: string }[];
	name: string;
	artists: { name: string }[];
}

export interface EpisodeMetadata {
	images: { url: string }[];
	name: string;
	show: { name: string };
}

export interface UiMetadata {
	preview: string;
	title: string;
	subtitle: string;
	showScreensaver?: boolean;
	missingNowPlayingContext?: boolean;
}

export interface TokenFile {
	token: string;
	expiration: Date;
}
