import { ORPCError } from "@orpc/client";
import * as z from "zod";
import { getSyncedColor } from "../../color-sync";
import { mapTrackMetadata } from "../../map-metadata";
import { fsGetThumbnailData, fsSetThumbnailData } from "../../token-fs";
import { SPOTIFY_API_URLS } from "../constants";
import { base } from "../handler";
import { spotifyFetchWithToken } from "../spotify-env";

type NowPlayingResponse = SpotifyApi.CurrentPlaybackResponse & {
	color_sync: string;
};

export const nowPlaying = base.handler(async ({ context }) => {
	const res = await spotifyFetchWithToken(SPOTIFY_API_URLS.now_playing, {
		headers: {
			Authorization: context.reqHeaders?.get("Authorization") ?? "",
		},
	});

	const status = res.status;
	if (status === 403) {
		console.log({
			code: "FORBIDDEN",
			message: await res.text(),
		});
		return new ORPCError("FORBIDDEN");
	}

	if (status === 204) {
		return { is_playing: false } as NowPlayingResponse;
	}

	const json = (await res.json()) as SpotifyApi.CurrentPlaybackResponse;

	const metadata = mapTrackMetadata(json.item);
	let color: string;

	// Try to avoid re-fetching the img on every call
	const cachedThumbnailMetadata = await fsGetThumbnailData();
	if (cachedThumbnailMetadata?.url === metadata.preview) {
		color = cachedThumbnailMetadata.color;
	} else {
		color = await getSyncedColor(metadata.preview);
		await fsSetThumbnailData({ url: metadata.preview, color });
	}

	return {
		color_sync: color,
		...json,
	} as NowPlayingResponse;
});

export const isSaved = base
	.input(z.object({ uris: z.string().array() }))
	.handler(async ({ input, context }) => {
		// const searchParams = new URL(ctx.req.url).searchParams;
		const response = await spotifyFetchWithToken(
			`${SPOTIFY_API_URLS.saved}?` +
				new URLSearchParams({
					uris: `${input.uris.join(",")}`,
				}),
			{
				method: "GET",
				headers: {
					Authorization: context.reqHeaders?.get("Authorization") ?? "",
				},
			},
		);

		return (await response.json()) as boolean[];
	});
