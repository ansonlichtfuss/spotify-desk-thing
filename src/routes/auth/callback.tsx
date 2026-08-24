import { useMutation } from "@tanstack/solid-query";
import { createFileRoute } from "@tanstack/solid-router";
import { createSignal } from "solid-js";
import { z } from "zod";
import { orpc } from "../../lib/orpc/client";

const searchSchema = z.object({
	code: z.string().default(""),
});

export const Route = createFileRoute("/auth/callback")({
	component: AuthCallback,
	validateSearch: searchSchema,
});

function AuthCallback() {
	const searchParams = Route.useSearch();
	const [refreshToken, setRefreshToken] = createSignal("loading...");

	const getRefreshToken = useMutation(() =>
		orpc.auth.refreshToken.mutationOptions({
			onSuccess: (data) => {
				setRefreshToken(JSON.stringify(data));
			},
		}),
	);

	return (
		<div class="bg-white">
			<button
				type="button"
				onClick={() => getRefreshToken.mutate({ code: searchParams().code })}
			>
				Click to grab refresh token
			</button>
			Copy this into the 'VITE_SPOTIFY_REFRESH_TOKEN' field in the .env file:
			<p>{refreshToken()}</p>
		</div>
	);
}
