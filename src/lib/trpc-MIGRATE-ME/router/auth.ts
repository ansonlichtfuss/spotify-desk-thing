import { getRefreshToken, setRefreshToken } from "../../refresh-token";
import { procedure, router, SPOTIFY_TOKEN_ENDPOINT } from "../constants";

export type SpotifyAuthState =
	| {
			access_token: string;
			token_type: string;
			expires_in: number;
			scope: string;
			calculatedExpiration: Date;
			timerReference: number;
	  }
	| {
			error: string;
			error_description: string;
	  };

export default router({
	accessToken: procedure.query(async () => {
		try {
			const client_id = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
			const client_secret = import.meta.env.VITE_SPOTIFY_CLIENT_SECRET;
			// const refresh_token: string =
			//   import.meta.env.VITE_SPOTIFY_REFRESH_TOKEN || "";
			const refresh_token = await getRefreshToken();
			const basic = btoa(`${client_id}:${client_secret}`);

			const res = await fetch(SPOTIFY_TOKEN_ENDPOINT, {
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
				setRefreshToken("token_expired_or_missing");
				// throw new TRPCError({
				//   code: "UNAUTHORIZED",
				//   message: json.error,
				//   // optional: pass the original error to retain stack trace
				//   cause: json,
				// });
			}
		} catch (e: any) {
			if (e?.code === "UNAUTHORIZED") {
				throw e;
			} else {
				// throw new TRPCError({
				//   code: "INTERNAL_SERVER_ERROR",
				//   cause: e,
				// });
			}
		}
	}),
});
