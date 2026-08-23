import { onError } from "@orpc/server";
import { RPCHandler } from "@orpc/server/fetch";
import { createFileRoute } from "@tanstack/solid-router";
import { router } from "../../lib/rpc/router";

const handler = new RPCHandler(router, {
	interceptors: [
		onError((error) => {
			console.error(error);
		}),
	],
});

export const Route = createFileRoute("/api/rpc/$")({
	server: {
		handlers: {
			ANY: async ({ request }) => {
				const { response } = await handler.handle(request, {
					prefix: "/api/rpc",
					context: {}, // Provide initial context if needed
				});

				return response ?? new Response("Not found", { status: 404 });
			},
		},
	},
});
