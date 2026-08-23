import { createServerOnlyFn } from "@tanstack/solid-start";
import type { TokenFile } from "./types";
import { getFileContent, setFileContent } from "./utils";

const REFRESH_TOKEN_FILE_NAME = ".token.refreshtoken";
const ACCESS_TOKEN_FILE_NAME = ".token.accesstoken";

export async function getRefreshTokenData(): Promise<TokenFile | null> {
	const content = await getFileContent(REFRESH_TOKEN_FILE_NAME);
	try {
		return JSON.parse(content);
	} catch (e) {
		console.log("Error parsing refresh token file", e);
		return null;
	}
}

export async function setRefreshTokenData(data: TokenFile) {
	return await setFileContent(REFRESH_TOKEN_FILE_NAME, JSON.stringify(data));
}

export async function getAccessTokenData(): Promise<TokenFile | null> {
	const content = await getFileContent(ACCESS_TOKEN_FILE_NAME);
	try {
		return JSON.parse(content);
	} catch (e) {
		console.log("Error parsing access token file", e);
		return null;
	}
}

export async function setAccessTokenData(data: TokenFile) {
	return await setFileContent(ACCESS_TOKEN_FILE_NAME, JSON.stringify(data));
}

export const getSpotifyClientId = createServerOnlyFn(
	() => process.env.SPOTIFY_CLIENT_ID,
);
export const getSpotifyClientSecret = createServerOnlyFn(
	() => process.env.SPOTIFY_CLIENT_SECRET,
);
