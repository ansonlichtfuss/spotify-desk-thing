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

	// createEffect(
	// 	() => code,
	// 	() => {
	// 		async function doTheThing() {
	// 			const res = await fetch(
	// 				"/api/v1/spotify/get-refresh-token?" +
	// 					new URLSearchParams({
	// 						code,
	// 					}),
	// 				{
	// 					method: "GET",
	// 				},
	// 			);

	// 			const response = await res.json();
	// 			setRefreshToken(response["refresh_token"] || JSON.stringify(response));
	// 		}

	// 		doTheThing();
	// 	},
	// );

	// const refreshToken = createMemo(async () => {
	// 	// const code = new URL(window.location.href).searchParams.get("code") || "";
	// 	const res = await fetch(
	// 		"/api/v1/spotify/get-refresh-token?" +
	// 			new URLSearchParams({
	// 				code,
	// 			}),
	// 		{
	// 			method: "GET",
	// 		},
	// 	);

	// 	const response = await res.json();

	// 	console.log("hey tiff refresh token", response);

	// 	return response["refresh_token"] || JSON.stringify(response);
	// });

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
