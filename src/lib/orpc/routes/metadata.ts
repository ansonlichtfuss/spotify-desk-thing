import { ORPCError } from "@orpc/client";
import * as z from "zod";
import { SPOTIFY_API_URLS } from "../constants";
import { base } from "../handler";
import { spotifyFetchWithToken } from "../spotify-env";

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
		return { is_playing: false } as SpotifyApi.CurrentPlaybackResponse;
	}

	return (await res.json()) as SpotifyApi.CurrentPlaybackResponse;
});

export const saved = base
	.input(z.object({ ids: z.string().array() }))
	.handler(async ({ input, context }) => {
		// const searchParams = new URL(ctx.req.url).searchParams;
		const response = await spotifyFetchWithToken(
			`${SPOTIFY_API_URLS.saved}?` +
				new URLSearchParams({
					ids: `${input.ids.join(",")}`,
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
