import { createFileRoute } from "@tanstack/solid-router";
import { createEffect, createSignal } from "solid-js";

export const Route = createFileRoute("/auth/callback")({
	component: AuthCallback,
});

export default function AuthCallback() {
	const code = new URL(window.location.href).searchParams.get("code") || "";

	const [refreshToken, setRefreshToken] = createSignal("loading...");

	createEffect(
		() => refreshToken(),
		() => {
			async function doTheThing() {
				const res = await fetch(
					"/api/v1/spotify/get-refresh-token?" +
						new URLSearchParams({
							code,
						}),
					{
						method: "GET",
					},
				);

				const response = await res.json();
				setRefreshToken(response["refresh_token"] || JSON.stringify(response));
			}

			doTheThing();
		},
	);

	return (
		<div class="bg-white">
			Copy this into the 'VITE_SPOTIFY_REFRESH_TOKEN' field in the .env file:
			<p>{refreshToken()}</p>
		</div>
	);
}
