import { differenceInHours } from "date-fns/differenceInHours";
import { z } from "zod";
import {
	getRefreshTokenData,
	getSpotifyClientId,
	getSpotifyClientSecret,
} from "../../token-fs";
import { OAUTH_REDIRECT_URI, SPOTIFY_API_URLS } from "../constants";
import { base } from "../handler";

export type SpotifyAuthState = {
	access_token: string;
	token_type: string;
	expires_in: number;
	scope: string;
	calculatedExpiration: Date;
	timerReference: number;
};

export const isAuthorized = base.handler(async () => {
	const refreshTokenData = await getRefreshTokenData();

	return {
		is_authorized:
			refreshTokenData?.expiration &&
			differenceInHours(refreshTokenData.expiration, new Date()) > 24,
	};
});

export const refreshToken = base
	.input(z.object({ code: z.string() }))
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
				redirect_uri: OAUTH_REDIRECT_URI,
				grant_type: "authorization_code",
			}),
		});

		const response = await res.json();

		return response;
	});
