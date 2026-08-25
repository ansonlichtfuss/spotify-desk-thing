import { getPalette } from "colorthief";

const DEFAULT_ACCENT_COLOR = "#111111";

async function downloadImageToBuffer(url: string) {
	// Fetch the image data from the URL
	const response = await fetch(url);

	if (!response.ok) {
		throw new Error(`Failed to fetch image: ${response.statusText}`);
	}

	// Convert the response stream into an ArrayBuffer
	const arrayBuffer = await response.arrayBuffer();

	// Convert the ArrayBuffer directly to a Node.js Buffer
	const buffer = Buffer.from(arrayBuffer);

	return buffer;
}

export const getSyncedColor = async (imgUrl: string) => {
	const imgBuffer = await downloadImageToBuffer(imgUrl);
	const palette = await getPalette(imgBuffer, { colorCount: 5 });

	const firstDarkIndex = palette?.findIndex((color) => color.isDark) ?? -1;

	return palette?.[firstDarkIndex].hex() ?? DEFAULT_ACCENT_COLOR;
};
