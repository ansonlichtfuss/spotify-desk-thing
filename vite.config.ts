import tailwindcss from "@tailwindcss/vite";
import { devtools } from "@tanstack/devtools-vite";
import { tanstackStart } from "@tanstack/solid-start/plugin/vite";
import { defineConfig } from "vite";

import solidPlugin from "vite-plugin-solid";

export default defineConfig({
	resolve: { tsconfigPaths: true },
	plugins: [
		devtools(),
		tailwindcss(),
		tanstackStart(),
		solidPlugin({ ssr: true }),
	],
});
