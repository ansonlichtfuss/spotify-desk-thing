import { ORPCError } from "@orpc/client";
import { addMonths } from "date-fns/addMonths";
import { addSeconds } from "date-fns/addSeconds";
import { differenceInHours } from "date-fns/differenceInHours";
import { z } from "zod";
import {
	fsGetRefreshTokenData,
	fsSetAccessTokenData,
	fsSetRefreshTokenData,
	getSpotifyClientId,
	getSpotifyClientSecret,
} from "../../token-fs";
import { SPOTIFY_API_URLS } from "../constants";
import { base } from "../handler";

type SpotifyAuthResponse = {
	access_token: string;
	token_type: string;
	expires_in: number;
	refresh_token: string;
	scope: string;
};

export const clientId = base.handler(async () => {
	const clientId = getSpotifyClientId();

	return {
		client_id: clientId,
	};
});

export const isAuthorized = base.handler(async () => {
	const refreshTokenData = await fsGetRefreshTokenData();

	return {
		is_authorized: !!(
			refreshTokenData?.expiration &&
			differenceInHours(refreshTokenData.expiration, new Date()) > 24
		),
	};
});

export const refreshToken = base
	.input(z.object({ code: z.string(), redirectUri: z.string() }))
	.handler(async ({ input }) => {
		const client_id = getSpotifyClientId();
		const client_secret = getSpotifyClientSecret();
		const basic = btoa(`${client_id}:${client_secret}`);

		const res = await fetch(SPOTIFY_API_URLS.token, {
			method: "POST",
			headers: {
				Authorization: `Basic ${basic}`,
				"Content-Type": "application/x-www-form-urlencoded",
			},
			body: new URLSearchParams({
				code: input.code,
				redirect_uri: input.redirectUri,
				grant_type: "authorization_code",
			}),
		});

		const response: SpotifyAuthResponse = await res.json();

		if (!res.ok || res.status !== 200) {
			console.log("hey tiff a major error", response);
			throw new ORPCError("INTERNAL_SERVER_ERROR", { data: res });
		}

		await fsSetRefreshTokenData({
			token: response.refresh_token,
			expiration: addMonths(new Date(), 6),
		});

		await fsSetAccessTokenData({
			token: response.access_token,
			expiration: addSeconds(new Date(), response.expires_in),
		});

		return {
			success: true,
		};
	});
