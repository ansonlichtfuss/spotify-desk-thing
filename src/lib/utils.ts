import { promises as fs } from "fs";

export async function getFileContent(filename: string) {
	try {
		const data = await fs.readFile(filename, "utf-8");
		return data;
	} catch (err) {
		console.error(err);
		return "{}";
	}
}

export async function setFileContent(filename: string, data: string) {
	try {
		await fs.writeFile(filename, data);
	} catch (err) {
		console.error(err);
	}
}
