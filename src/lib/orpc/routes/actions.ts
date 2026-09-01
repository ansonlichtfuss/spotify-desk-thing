import { ORPCError } from "@orpc/client";
import { z } from "zod";
import { SPOTIFY_API_URLS } from "../constants";
import { base } from "../handler";
import { spotifyFetchWithToken } from "../spotify-env";

export const pause = base.handler(async ({ context }) => {
	const response = await spotifyFetchWithToken(SPOTIFY_API_URLS.pause, {
		method: "PUT",
		headers: {
			Authorization: context.reqHeaders?.get("Authorization") ?? "",
		},
	});

	if (response.status === 200 || response.status === 204) {
		return "";
	} else {
		return new ORPCError("INTERNAL_SERVER_ERROR");
	}
});

export const play = base.handler(async ({ context }) => {
	const response = await spotifyFetchWithToken(SPOTIFY_API_URLS.play, {
		method: "PUT",
		headers: {
			Authorization: context.reqHeaders?.get("Authorization") ?? "",
		},
	});

	if (response.status === 200 || response.status === 204) {
		return "";
	} else {
		return new ORPCError("INTERNAL_SERVER_ERROR");
	}
});

export const previous = base.handler(async ({ context }) => {
	const response = await spotifyFetchWithToken(SPOTIFY_API_URLS.previous, {
		method: "POST",
		headers: {
			Authorization: context.reqHeaders?.get("Authorization") ?? "",
		},
	});

	if (response.status === 200 || response.status === 204) {
		return "";
	} else {
		return new ORPCError("INTERNAL_SERVER_ERROR");
	}
});

export const next = base.handler(async ({ context }) => {
	const response = await spotifyFetchWithToken(SPOTIFY_API_URLS.next, {
		method: "POST",
		headers: {
			Authorization: context.reqHeaders?.get("Authorization") ?? "",
		},
	});

	if (response.status === 200 || response.status === 204) {
		return "";
	} else {
		return new ORPCError("INTERNAL_SERVER_ERROR");
	}
});

export const shuffle = base
	.input(z.object({ state: z.boolean() }))
	.handler(async ({ input, context }) => {
		// const searchParams = new URL(context.req.url).searchParams;
		const response = await spotifyFetchWithToken(
			`${SPOTIFY_API_URLS.shuffle}?` +
				new URLSearchParams({
					state: input.state ? "true" : "false",
				}),
			{
				method: "PUT",
				headers: {
					Authorization: context.reqHeaders?.get("Authorization") ?? "",
				},
			},
		);

		if (response.status === 200 || response.status === 204) {
			return "";
		} else {
			return new ORPCError("INTERNAL_SERVER_ERROR");
		}
	});

export const saveToLibrary = base
	.input(z.object({ uris: z.string().array() }))
	.handler(async ({ input, context }) => {
		// const searchParams = new URL(ctx.req.url).searchParams;
		const response = await spotifyFetchWithToken(
			`${SPOTIFY_API_URLS.library}?` +
				new URLSearchParams({
					uris: `${input.uris.join(",")}`,
				}),
			{
				method: "PUT",
				headers: {
					Authorization: context.reqHeaders?.get("Authorization") ?? "",
				},
			},
		);

		if (response.status === 200 || response.status === 204) {
			return "";
		} else {
			return new ORPCError("INTERNAL_SERVER_ERROR");
		}
	});

export const removeFromLibrary = base
	.input(z.object({ uris: z.string().array() }))
	.handler(async ({ input, context }) => {
		// const searchParams = new URL(ctx.req.url).searchParams;
		const response = await spotifyFetchWithToken(
			`${SPOTIFY_API_URLS.library}?` +
				new URLSearchParams({
					uris: `${input.uris.join(",")}`,
				}),
			{
				method: "DELETE",
				headers: {
					Authorization: context.reqHeaders?.get("Authorization") ?? "",
				},
			},
		);

		if (response.status === 200 || response.status === 204) {
			return "";
		} else {
			console.log("hey tiff res", response);
			return new ORPCError("INTERNAL_SERVER_ERROR");
		}
	});
