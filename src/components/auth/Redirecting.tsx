import { BiLogosSpotify } from "solid-icons/bi";

export const Redirecting = () => {
	return (
		<div class="text-white flex flex-col items-center justify-center h-screen">
			<BiLogosSpotify color="#1ED35F" size={120} />
			<p class="mt-5 italic">Redirecting...</p>
		</div>
	);
};
