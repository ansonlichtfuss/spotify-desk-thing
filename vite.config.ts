import solid from "solid-start/vite";
import { defineConfig } from "vite";
import UnocssPlugin from "@unocss/vite";

export default defineConfig({
  plugins: [
    solid({ ssr: false }),
    UnocssPlugin({
      // your config or in uno.config.ts
    }),
  ],
});
