import { useQuery } from "@tanstack/solid-query";
import { createFileRoute } from "@tanstack/solid-router";
import { createEffect } from "solid-js";
import { Redirecting } from "../../components/auth/Redirecting";
import { orpc } from "../../lib/orpc/client";

export const Route = createFileRoute("/auth/initialize")({
	component: AuthInitialize,
});

const redirect_uri = "http://127.0.0.1:3000/auth/callback";
const scope = [
	"streaming",
	"user-modify-playback-state",
	"user-read-playback-state",
	"user-read-currently-playing",
	"user-read-email",
	"user-read-playback-position",
	"user-read-private",
	"user-top-read",
	"user-library-read",
	"user-library-modify",
].join(",");

function AuthInitialize() {
	const query = useQuery(() => orpc.auth.clientId.queryOptions());

	createEffect(
		() => ({
			clientId: query.data?.client_id,
			isReady: query.isSuccess,
		}),
		({ clientId, isReady }) => {
			if (isReady) {
				const redirectUrl =
					"https://accounts.spotify.com/authorize?" +
					new URLSearchParams({
						response_type: "code",
						client_id: clientId || "",
						scope: scope,
						redirect_uri: redirect_uri,
					});
				window.location.assign(redirectUrl);
			}
		},
	);

	return <Redirecting />;
}
