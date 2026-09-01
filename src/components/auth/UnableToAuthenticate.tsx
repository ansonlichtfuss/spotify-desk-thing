import { Link } from "@tanstack/solid-router";
import { BiLogosSpotify } from "solid-icons/bi";

export const UnableToAuthenticate = () => {
	return (
		<div class="text-white flex flex-col items-center justify-center h-screen text-center">
			<BiLogosSpotify color="#1ED35F" size={120} />
			<p class="mt-5">
				<strong>Log in to use Desk Thing.</strong>
			</p>
			<p class="mt-5 italic">
				<small class="max-w-80 block">
					Follow the README guide to set up your Spotify Web API client. Make
					sure to set your redirect URL path to:
					<br />
					<strong>{window.location.host}</strong>
				</small>
			</p>
			<Link
				to="/auth/initialize"
				class="border-b-2 border-gray-500 inline mt-5 font-bold"
			>
				Click here to log in
			</Link>
		</div>
	);
};
