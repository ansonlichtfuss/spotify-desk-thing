import { initTRPC } from "@trpc/server";
import type { IContext } from "./context";

export const t = initTRPC.context<IContext>().create();

export const router = t.router;
export const procedure = t.procedure;

const SPOTIFY_API_URL = `https://api.spotify.com/v1`;
export const SPOTIFY_TOKEN_ENDPOINT = `https://accounts.spotify.com/api/token`;
export const SPOTIFY_NOW_PLAYING_ENDPOINT = `${SPOTIFY_API_URL}/me/player?additional_types=track,episode`;
export const SPOTIFY_SAVED_ENDPOINT = `${SPOTIFY_API_URL}/me/tracks/contains`;
export const SPOTIFY_PAUSE_ENDPOINT = `${SPOTIFY_API_URL}/me/player/pause`;
export const SPOTIFY_PLAY_ENDPOINT = `${SPOTIFY_API_URL}/me/player/play`;
export const SPOTIFY_PREVIOUS_ENDPOINT = `${SPOTIFY_API_URL}/me/player/previous`;
export const SPOTIFY_NEXT_ENDPOINT = `${SPOTIFY_API_URL}/me/player/next`;
export const SPOTIFY_SHUFFLE_ENDPOINT = `${SPOTIFY_API_URL}/me/player/shuffle`;