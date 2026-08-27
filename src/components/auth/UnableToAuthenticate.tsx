import { Link } from "@tanstack/solid-router";
import SvgSpotifyWhite from "../icons/spotify-white.svg";

export const UnableToAuthenticate = () => {
	return (
		<div class="flex flex-col items-center justify-center h-screen">
			<img
				class="opacity-25 mb-10"
				src={SvgSpotifyWhite}
				width={"100"}
				height={"100"}
				alt="Spotify logo"
			/>
			<p class="text-white text-center max-w-sm font-bold">
				Unable to authenticate with API.
				<br />
				Refresh token either expired or missing.
			</p>
			<Link
				to="/auth/initialize"
				class="rounded bg-white px-8 py-2 inline mt-5 font-bold"
			>
				Click here to log in
			</Link>
		</div>
	);
};
