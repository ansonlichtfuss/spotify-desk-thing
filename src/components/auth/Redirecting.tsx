import SvgSpotifyWhite from "../icons/spotify-white.svg";

export const Redirecting = () => {
	return (
		<div class="flex flex-col items-center justify-center h-screen">
			<img
				class="opacity-25 mb-10"
				src={SvgSpotifyWhite}
				width={"100"}
				height={"100"}
				alt="Spotify logo"
			/>
			<p class="text-white text-center max-w-sm font-bold">Redirecting...</p>
		</div>
	);
};
