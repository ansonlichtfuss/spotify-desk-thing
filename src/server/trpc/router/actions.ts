import { TRPCError } from "@trpc/server";
import { z } from "zod";
import {
  SPOTIFY_NEXT_ENDPOINT,
  SPOTIFY_PAUSE_ENDPOINT,
  SPOTIFY_PLAY_ENDPOINT,
  SPOTIFY_PREVIOUS_ENDPOINT,
  SPOTIFY_SHUFFLE_ENDPOINT,
  procedure,
  router
} from "../utils";

export default router({
  pause: procedure.mutation(async ({ input, ctx }) => {
    try {
      const response = await fetch(SPOTIFY_PAUSE_ENDPOINT, {
        method: "PUT",
        headers: {
          Authorization: ctx.req.headers.get("Authorization") ?? "",
        },
      });

      if (response.status === 200 || response.status === 204) {
        return "";
      } else {
        throw new Error();
      }
    } catch (e) {
      console.log("pause error", e);
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: e as string,
      });
    }
  }),
  play: procedure.mutation(async ({ input, ctx }) => {
    try {
      const response = await fetch(SPOTIFY_PLAY_ENDPOINT, {
        method: "PUT",
        headers: {
          Authorization: ctx.req.headers.get("Authorization") ?? "",
        },
      });

      if (response.status === 200 || response.status === 204) {
        return "";
      } else {
        throw new Error();
      }
    } catch (e) {
      console.log("play error", e);
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: e as string,
      });
    }
  }),
  previous: procedure.mutation(async ({ input, ctx }) => {
    try {
      const response = await fetch(SPOTIFY_PREVIOUS_ENDPOINT, {
        method: "POST",
        headers: {
          Authorization: ctx.req.headers.get("Authorization") ?? "",
        },
      });

      if (response.status === 200 || response.status === 204) {
        return "";
      } else {
        throw new Error();
      }
    } catch (e) {
      console.log("previous error", e);
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: e as string,
      });
    }
  }),
  next: procedure.mutation(async ({ input, ctx }) => {
    try {
      const response = await fetch(SPOTIFY_NEXT_ENDPOINT, {
        method: "POST",
        headers: {
          Authorization: ctx.req.headers.get("Authorization") ?? "",
        },
      });

      if (response.status === 200 || response.status === 204) {
        return "";
      } else {
        throw new Error();
      }
    } catch (e) {
      console.log("next error", e);
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: e as string,
      });
    }
  }),
  shuffle: procedure
    .input(z.object({ state: z.boolean() }))
    .mutation(async ({ input, ctx }) => {
      try {
        const searchParams = new URL(ctx.req.url).searchParams;
        const response = await fetch(
          `${SPOTIFY_SHUFFLE_ENDPOINT}?` +
          new URLSearchParams({
            state: input.state ? 'true' : 'false',
          }),
          {
            method: "PUT",
            headers: {
              Authorization: ctx.req.headers.get("Authorization") ?? "",
            },
          }
        );

        if (response.status === 200 || response.status === 204) {
          return "";
        } else {
          throw new Error();
        }
      } catch (e) {
        console.log("shuffle error", e);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: e as string,
        });
      }
    }),
});
