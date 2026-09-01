import { useQuery } from "@tanstack/solid-query";
import { createMemo } from "solid-js";
import { orpc } from "../lib/orpc/client";
import { UnableToAuthenticate } from "./auth/UnableToAuthenticate";
import { SpotifyNowPlaying } from "./SpotifyNowPlaying";

const CARD_SIZE = 715;

export const App = () => {
	const isAuthenticated = useQuery(() => orpc.auth.isAuthorized.queryOptions());
	const shouldShowAuthError = createMemo(() => {
		if (isAuthenticated.isPending) {
			return false;
		}
		return !isAuthenticated.data?.is_authorized;
	});

	return (
		<main>
			{!shouldShowAuthError() && (
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
			{shouldShowAuthError() && <UnableToAuthenticate />}
		</main>
	);
};
