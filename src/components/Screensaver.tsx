import { BiLogosSpotify } from "solid-icons/bi";
import type { Component } from "solid-js";

export const Screensaver: Component = () => {
	return (
		<div class="w-full h-full bg-black flex items-center justify-center opacity-25">
			<BiLogosSpotify color="#ffffff" size={200} />
		</div>
	);
};
