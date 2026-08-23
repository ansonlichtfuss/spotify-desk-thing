import { promises as fs } from "fs";

async function getFileContent(filename: string) {
	try {
		const data = await fs.readFile(filename, "utf-8");
		return data;
	} catch (err) {
		console.error(err);
		return "";
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

export async function getRefreshToken() {
	return await getFileContent(REFRESH_TOKEN_FILE_NAME);
}

export async function setRefreshToken(data: string) {
	return await setFileContent(REFRESH_TOKEN_FILE_NAME, data);
}

export async function getAccessToken() {
	return await getFileContent(ACCESS_TOKEN_FILE_NAME);
}

export async function setAccessToken(data: string) {
	return await setFileContent(ACCESS_TOKEN_FILE_NAME, data);
}
