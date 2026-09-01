import { useMutation } from "@tanstack/solid-query";
import { Link, useRouter } from "@tanstack/solid-router";
import { BiLogosSpotify } from "solid-icons/bi";
import { createEffect, createSignal } from "solid-js";
import { orpc } from "../../lib/orpc/client";
import { Route } from "../../routes/auth/callback";

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
			if (code) {
				getRefreshToken.mutate({
					code,
					redirectUri: `${window.location.origin}/auth/callback`,
				});
			} else {
				setHasError(true);
			}
		},
	);

	return (
		<div class="text-white flex flex-col items-center justify-center h-screen strong">
			<BiLogosSpotify color="#1ED35F" size={120} />

			{hasError() ? (
				<>
					<p class="text-center max-w-sm mt-5">
						An error occurred while logging in.
					</p>

					<Link
						to="/auth/initialize"
						class="border-b-2 border-gray-500 inline mt-5 font-bold"
					>
						Try again
					</Link>
				</>
			) : (
				<p class="mt-5 italic">Logging in...</p>
			)}
		</div>
	);
};
