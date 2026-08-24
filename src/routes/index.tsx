import { useQuery } from "@tanstack/solid-query";
import { createFileRoute } from "@tanstack/solid-router";
import { SpotifyNowPlaying } from "../components/SpotifyNowPlaying";
import { orpc } from "../lib/orpc/client";

export const Route = createFileRoute("/")({ component: App, ssr: false });

const CARD_SIZE = 715;

function App() {
	const isAuthenticated = useQuery(() => orpc.auth.isAuthorized.queryOptions());
	return (
		<main>
			{isAuthenticated.data?.is_authorized && (
				<div class="flex items-center justify-center w-screen h-screen text-white">
					<div
						class="relative flex"
						style={{
							flex: "none",
							width: `${CARD_SIZE}px`,
							height: `${CARD_SIZE}px`,
						}}
					>
						<div
							class="relative text-white rounded-3xl overflow-hidden"
							style={{
								flex: "none",
								width: `${CARD_SIZE}px`,
								height: `${CARD_SIZE}px`,
								transform: `translateZ(0)`, // Fix for rounded corners in webkit
								"scroll-snap-align": "center",
							}}
						>
							<SpotifyNowPlaying />
						</div>
					</div>
				</div>
			)}
			{!isAuthenticated.data?.is_authorized && (
				<div class="grid items-center justify-center h-screen">
					<p class="text-white text-center max-w-sm">
						Unable to authenticate with API. Have you set the proper auth tokens
						in the ".env" configuration file? (see README for setup
						instructions)
					</p>
				</div>
			)}
		</main>
	);
}
