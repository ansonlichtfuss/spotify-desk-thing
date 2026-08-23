import { promises as fs } from "fs";

const REFRESH_TOKEN_FILE_NAME = ".refreshtoken";

export async function getRefreshToken() {
	try {
		const data = await fs.readFile(REFRESH_TOKEN_FILE_NAME, "utf-8");
		console.log("hey tiff get refresh token", data);
		return data;
	} catch (err) {
		console.error(err);
		return "";
	}
}

export async function setRefreshToken(token: string) {
	try {
		await fs.writeFile(REFRESH_TOKEN_FILE_NAME, token);
	} catch (err) {
		console.error(err);
	}
}
