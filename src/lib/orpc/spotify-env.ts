import { ORPCError } from "@orpc/client";
import { createServerOnlyFn } from "@tanstack/solid-start";
import { addSeconds } from "date-fns/addSeconds";
import { differenceInSeconds } from "date-fns/differenceInSeconds";
import {
	getAccessTokenData,
	getRefreshTokenData,
	getSpotifyClientId,
	getSpotifyClientSecret,
	setAccessTokenData,
} from "../token-fs";
import { SPOTIFY_API_URLS } from "./constants";

const accessToken = createServerOnlyFn(async () => {
	const client_id = getSpotifyClientId();
	const client_secret = getSpotifyClientSecret();
	const refreshTokenData = await getRefreshTokenData();
	const basic = btoa(`${client_id}:${client_secret}`);

	if (!refreshTokenData?.token) {
		throw new ORPCError("UNAUTHORIZED", { message: "Missing refresh token" });
	}

	const res = await fetch(SPOTIFY_API_URLS.token, {
		method: "POST",
		headers: {
			Authorization: `Basic ${basic}`,
			"Content-Type": "application/x-www-form-urlencoded",
		},
		body: new URLSearchParams({
			grant_type: "refresh_token",
			refresh_token: refreshTokenData.token,
		}),
	});

	const json = await res.json();
	if (res.ok) {
		return json;
	} else {
		// setRefreshToken("token_expired_or_missing");
		return new ORPCError("UNAUTHORIZED", {
			message: json.error,
			// optional: pass the original error to retain stack trace
			data: json,
		});
	}
});

const getSpotifyAccessToken = async (): Promise<string> => {
	const accessTokenData = await getAccessTokenData();

	if (
		!accessTokenData?.expiration ||
		differenceInSeconds(accessTokenData.expiration, new Date()) <= 60
	) {
		const accessTokenResponse = await accessToken();
		setAccessTokenData({
			token: accessTokenResponse.access_token,
			expiration: addSeconds(new Date(), 3600),
		});
		return accessTokenResponse.access_token;
	}

	return accessTokenData.token;
};

export async function spotifyFetchWithToken(url: string, init?: RequestInit) {
	const token = await getSpotifyAccessToken();
	return fetch(url, {
		...init,
		headers: { ...init?.headers, Authorization: `Bearer ${token}` },
	});
}
