import { promises as fs } from "node:fs";
import { createServerOnlyFn } from "@tanstack/solid-start";
import type { CacheFile } from "./types";

const CACHE_FILE_NAME = ".cache";

/**
 * Environment variables
 */
export const getSpotifyClientId = createServerOnlyFn(
	() => process.env.SPOTIFY_CLIENT_ID,
);
export const getSpotifyClientSecret = createServerOnlyFn(
	() => process.env.SPOTIFY_CLIENT_SECRET,
);

/**
 * Baseline file system read/write
 * DO NOT EXPORT
 */
const readFile = createServerOnlyFn(async (): Promise<CacheFile> => {
	try {
		const data = await fs.readFile(CACHE_FILE_NAME, "utf-8");
		return JSON.parse(data);
	} catch (err) {
		console.error(err);
		return {};
	}
});

const saveFile = createServerOnlyFn(async (data: CacheFile) => {
	try {
		await fs.writeFile(CACHE_FILE_NAME, JSON.stringify(data));
	} catch (err) {
		console.error(err);
	}
});

/**
 * Specific attribute read/write
 */
export const fsGetRefreshTokenData = createServerOnlyFn(async () => {
	try {
		const content = await readFile();
		return content.refresh_token;
	} catch (e) {
		console.log("Error getting refresh token data", e);
		return null;
	}
});

export const fsSetRefreshTokenData = createServerOnlyFn(
	async (data: CacheFile["refresh_token"]) => {
		try {
			const content = await readFile();
			await saveFile({
				...content,
				refresh_token: data,
			});
		} catch (e) {
			console.log("Error writing refresh token data", e);
			return null;
		}
	},
);

export const fsGetAccessTokenData = createServerOnlyFn(async () => {
	try {
		const content = await readFile();
		return content.access_token;
	} catch (e) {
		console.log("Error getting refresh token data", e);
		return null;
	}
});

export const fsSetAccessTokenData = createServerOnlyFn(
	async (data: CacheFile["access_token"]) => {
		try {
			const content = await readFile();
			await saveFile({
				...content,
				access_token: data,
			});
		} catch (e) {
			console.log("Error writing access token data", e);
			return null;
		}
	},
);

export const fsGetThumbnailData = createServerOnlyFn(async () => {
	try {
		const content = await readFile();
		return content.thumbnail;
	} catch (e) {
		console.log("Error getting thumbnail data", e);
		return null;
	}
});

export const fsSetThumbnailData = createServerOnlyFn(
	async (data: CacheFile["thumbnail"]) => {
		try {
			const content = await readFile();
			await saveFile({
				...content,
				thumbnail: data,
			});
		} catch (e) {
			console.log("Error writing thumbnail data", e);
			return null;
		}
	},
);
