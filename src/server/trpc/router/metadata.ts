import { TRPCError } from "@trpc/server";
import { z } from "zod";
import {
  SPOTIFY_NOW_PLAYING_ENDPOINT,
  SPOTIFY_SAVED_ENDPOINT,
  procedure,
  router,
} from "../utils";

export default router({
  nowPlaying: procedure.query(async ({ input, ctx }) => {
    try {
      const res = await fetch(SPOTIFY_NOW_PLAYING_ENDPOINT, {
        headers: {
          Authorization: ctx.req.headers.get("Authorization") ?? "",
        },
      });

      const status = res.status;
      if (status === 403) {
        throw new TRPCError({
          code: "FORBIDDEN",
          message: await res.text(),
        });
      }

      if (status === 204) {
        return { is_playing: false } as SpotifyApi.CurrentPlaybackResponse;
      }

      return (await res.json()) as SpotifyApi.CurrentPlaybackResponse;
    } catch (e) {
      console.log("nowPlaying error", e);
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: e as string,
      });
    }
  }),
  saved: procedure
    .input(z.object({ ids: z.string().array() }))
    .query(async ({ input, ctx }) => {
      try {
        const searchParams = new URL(ctx.req.url).searchParams;
        const response = await fetch(
          `${SPOTIFY_SAVED_ENDPOINT}?` +
            new URLSearchParams({
              ids: `${input.ids.join(",")}`,
            }),
          {
            method: "GET",
            headers: {
              Authorization: ctx.req.headers.get("Authorization") ?? "",
            },
          }
        );

        return (await response.json()) as Boolean[];
      } catch (e) {
        console.log("saved error", e);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: e as string,
        });
      }
    }),
});
