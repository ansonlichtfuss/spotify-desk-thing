import { TRPCError } from "@trpc/server";
import { SPOTIFY_TOKEN_ENDPOINT, procedure, router } from "../utils";

export type SpotifyAuthState = {
  access_token: string;
  token_type: string;
  expires_in: number;
  scope: string;
  calculatedExpiration: Date;
  timerReference: number;
};

export default router({
  accessToken: procedure.query(async ({ input, ctx }) => {
    try {
      const client_id = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
      const client_secret = import.meta.env.VITE_SPOTIFY_CLIENT_SECRET;
      const refresh_token: string =
        import.meta.env.VITE_SPOTIFY_REFRESH_TOKEN || "";
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

      return await res.json() as SpotifyAuthState;
    } catch (e) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: e as string,
      });
    }
  }),
});
