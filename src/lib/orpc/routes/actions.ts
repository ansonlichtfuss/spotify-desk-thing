import { ORPCError } from "@orpc/client";
import { z } from "zod";
import { SPOTIFY_API_URLS } from "../constants";
import { base } from "../handler";

export const pause = base.handler(async ({ context }) => {
	const response = await fetch(SPOTIFY_API_URLS.pause, {
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
	const response = await fetch(SPOTIFY_API_URLS.play, {
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
	const response = await fetch(SPOTIFY_API_URLS.previous, {
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
	const response = await fetch(SPOTIFY_API_URLS.next, {
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
		const response = await fetch(
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
