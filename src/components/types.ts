interface AlbumMetadata {
  images: { url: string }[];
  name: string,
  artists: { name: string }[];
}

interface EpisodeMetadata {
  images: { url: string }[];
  name: string,
  show: { name: string };
}

interface UiMetadata {
  preview: string;
  title: string;
  subtitle: string;
  missingNowPlayingContext?: boolean;
}