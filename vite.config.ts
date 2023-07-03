import solid from "solid-start/vite";
import { defineConfig } from "vite";
import UnocssPlugin from "@unocss/vite";
// import { visualizer } from "rollup-plugin-visualizer";


export default defineConfig({
  plugins: [
    solid({ ssr: false }),
    UnocssPlugin({
      // your config or in uno.config.ts
    }),
    // visualizer({
    //   emitFile: true,
    //   // filename: "stats.html",
    // }),
  ],
});
