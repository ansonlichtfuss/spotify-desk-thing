import { useQuery } from "@tanstack/solid-query";
import { type Component, createEffect, createMemo } from "solid-js";
import { orpc } from "../lib/orpc/client";
import type { AlbumMetadata, EpisodeMetadata, UiMetadata } from "../lib/types";
import { DynamicBackground } from "./DynamicBackground";
import SvgMusic from "./icons/bx-music.svg";
import { PlayerControls } from "./PlayerControls/PlayerControls";
import { Screensaver } from "./Screensaver";

const PREVIEW_SIZE = 400;

const getAlbumMetadata = ({
	album,
	name,
}: {
	album: AlbumMetadata;
	name: string;
}) => ({
	preview: album.images[0].url,
	title: name,
	subtitle: album.artists.map((artist) => artist.name).join(", "),
});

const getEpisodeMetadata = (episode: EpisodeMetadata) => ({
	preview: episode.images[0].url,
	title: episode.name,
	subtitle: episode.show.name,
});

const metadataMappers: Record<
	SpotifyApi.CurrentlyPlayingObject["currently_playing_type"],
	(item: any) => UiMetadata
> = {
	track: getAlbumMetadata,
	episode: getEpisodeMetadata,
	ad: (e) => e, // TODO
	unknown: (e) => e, // TODO
};

export const SpotifyNowPlaying: Component = () => {
	const nowPlayingQuery = useQuery(() =>
		orpc.metadata.nowPlaying.queryOptions(),
	);
	const isSavedQuery = useQuery(() =>
		orpc.metadata.saved.queryOptions({
			input: { ids: [nowPlayingQuery.data?.item?.id || ""] },
			enabled: !!nowPlayingQuery.data?.item?.id,
		}),
	);

	createEffect(
		() => ({
			is_playing: nowPlayingQuery.data?.is_playing,
			duration_ms: nowPlayingQuery.data?.item?.duration_ms,
			progress_ms: nowPlayingQuery.data?.progress_ms,
		}),
		({ is_playing, duration_ms, progress_ms }) => {
			let refreshTimeout = is_playing ? 8000 : 15000;
			const songDuration = duration_ms ?? 0;
			const currentProgress = progress_ms ?? 0;

			const timeLeftOnSong = songDuration - currentProgress;
			if (is_playing && timeLeftOnSong < refreshTimeout) {
				refreshTimeout = timeLeftOnSong + 1000;
			}

			const interval = setInterval(
				() => nowPlayingQuery.refetch(),
				refreshTimeout,
			);
			return () => {
				clearInterval(interval);
			};
		},
	);

	const metadata = createMemo<UiMetadata>(() => {
		const mapperKey = nowPlayingQuery.data?.currently_playing_type ?? "track";
		const mapper = metadataMappers[mapperKey];

		const mapAttempt =
			mapper &&
			nowPlayingQuery.data?.item &&
			mapper(nowPlayingQuery.data?.item);

		if (!mapAttempt) {
			return {
				preview: "",
				title: "",
				subtitle: "",
				missingNowPlayingContext: true,
				showScreensaver: true,
			};
		} else {
			return { ...mapAttempt, showScreensaver: false };
		}
	});

	return (
		<div class="w-full h-full">
			{metadata().showScreensaver ? (
				<Screensaver />
			) : (
				<DynamicBackground imgUrl={metadata()?.preview}>
					<div class="flex flex-col items-center">
						<div
							class="bg-gray-800 relative flex items-center justify-center color-gray-500"
							style={{
								width: `${PREVIEW_SIZE}px`,
								height: `${PREVIEW_SIZE}px`,
							}}
						>
							<div class="absolute z-0">
								<img
									alt="Generic music icon"
									src={SvgMusic}
									width={`${PREVIEW_SIZE / 2}px`}
									height={`${PREVIEW_SIZE / 2}px`}
								/>
							</div>
							<div
								class="relative z-10"
								style={{
									width: `${PREVIEW_SIZE}px`,
									height: `${PREVIEW_SIZE}px`,
									"background-image": `url(${metadata()?.preview})`,
									"background-position": "center center",
									"background-repeat": "no-repeat",
									"background-size": "contain",
								}}
							/>
						</div>
						<p class="font-extrabold text-5xl pt-7 pb-2 text-ellipsis overflow-hidden whitespace-nowrap max-w-xl leading-lg">
							{metadata()?.title}
						</p>
						<p class="opacity-75 text-2xl font-bold text-ellipsis overflow-hidden whitespace-nowrap max-w-xl">
							{metadata()?.subtitle}
						</p>
					</div>

					<PlayerControls isSaved={!!isSavedQuery.data?.[0]} />
				</DynamicBackground>
			)}
		</div>
	);
};
