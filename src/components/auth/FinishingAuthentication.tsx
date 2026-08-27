import { useMutation } from "@tanstack/solid-query";
import { Link, useRouter } from "@tanstack/solid-router";
import { createEffect, createSignal } from "solid-js";
import { orpc } from "../../lib/orpc/client";
import { Route } from "../../routes/auth/callback";
import SvgSpotifyWhite from "../icons/spotify-white.svg";

export const FinishingAuthentication = () => {
	const searchParams = Route.useSearch();
	const router = useRouter();
	const [hasError, setHasError] = createSignal(false);

	const getRefreshToken = useMutation(() =>
		orpc.auth.refreshToken.mutationOptions({
			onSuccess() {
				router.navigate({ to: "/" });
			},
			onError() {
				setHasError(true);
			},
		}),
	);

	createEffect(
		() => searchParams().code,
		(code) => {
			getRefreshToken.mutate({ code });
		},
	);

	return (
		<div class="flex flex-col items-center justify-center h-screen strong">
			<img
				class="opacity-25 mb-10"
				src={SvgSpotifyWhite}
				width={"100"}
				height={"100"}
				alt="Spotify logo"
			/>
			{hasError() ? (
				<p class="text-white text-center max-w-sm font-bold">
					An error occurred logging in.
					<Link
						to="/auth/initialize"
						class="rounded bg-white px-8 py-2 inline mt-5"
					>
						Click here to try again
					</Link>
				</p>
			) : (
				<p class="text-white text-center max-w-sm font-bold">Logging in...</p>
			)}
		</div>
	);
};
