import { ORPCError } from "@orpc/client";
import { z } from "zod";
import { getRefreshToken } from "../../refresh-token";
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

export const accessToken = base.handler(async () => {
	try {
		const client_id = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
		const client_secret = import.meta.env.VITE_SPOTIFY_CLIENT_SECRET;
		// const refresh_token: string =
		//   import.meta.env.VITE_SPOTIFY_REFRESH_TOKEN || "";
		const refresh_token = await getRefreshToken();
		// console.log("hey tiff TOKENS", { client_id, client_secret, refresh_token });
		const basic = btoa(`${client_id}:${client_secret}`);

		const res = await fetch(SPOTIFY_API_URLS.token, {
			method: "POST",
			headers: {
				Authorization: `Basic ${basic}`,
				"Content-Type": "application/x-www-form-urlencoded",
			},
			body: new URLSearchParams({
				grant_type: "refresh_token",
				refresh_token,
			}),
		});

		const json = await res.json();
		if (res.ok) {
			return json;
		}

		if (json?.error) {
			// setRefreshToken("token_expired_or_missing");
			return new ORPCError("UNAUTHORIZED", {
				message: json.error,
				// optional: pass the original error to retain stack trace
				data: json,
			});
		}
	} catch (e: any) {
		if (e?.code === "UNAUTHORIZED") {
			return new ORPCError("UNAUTHORIZED", {
				data: e,
			});
		} else {
			return new ORPCError("INTERNAL_SERVER_ERROR", {
				data: e,
			});
		}
	}
});

export const refreshToken = base
	.input(z.object({ code: z.string() }))
	.handler(async ({ input }) => {
		const client_id = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
		const client_secret = import.meta.env.VITE_SPOTIFY_CLIENT_SECRET;
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
