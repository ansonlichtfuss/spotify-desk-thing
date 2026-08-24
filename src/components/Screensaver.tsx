import type { Component } from "solid-js";
import SvgSpotifyWhite from "./icons/spotify-white.svg";

export const Screensaver: Component = () => {
	return (
		<div class="w-full h-full bg-black flex items-center justify-center">
			<img
				class="opacity-25"
				src={SvgSpotifyWhite}
				width={"150"}
				height={"150"}
				alt="Spotify logo"
			/>
		</div>
	);
};
