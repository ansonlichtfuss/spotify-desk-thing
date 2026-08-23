import { createServerOnlyFn } from "@tanstack/solid-start";
import { promises as fs } from "fs";
import type { TokenFile } from "./types";

export const getSpotifyClientId = createServerOnlyFn(
	() => process.env.SPOTIFY_CLIENT_ID,
);
export const getSpotifyClientSecret = createServerOnlyFn(
	() => process.env.SPOTIFY_CLIENT_SECRET,
);

async function getFileContent(filename: string) {
	try {
		const data = await fs.readFile(filename, "utf-8");
		return data;
	} catch (err) {
		console.error(err);
		return "{}";
	}
}

async function setFileContent(filename: string, data: string) {
	try {
		await fs.writeFile(filename, data);
	} catch (err) {
		console.error(err);
	}
}

const REFRESH_TOKEN_FILE_NAME = ".refreshtoken";
const ACCESS_TOKEN_FILE_NAME = ".accesstoken";

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
