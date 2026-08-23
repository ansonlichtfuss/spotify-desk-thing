import { onError } from "@orpc/server";
import { RPCHandler } from "@orpc/server/fetch";
import {
	BatchHandlerPlugin,
	CORSHandlerPlugin,
	RequestHeadersHandlerPlugin,
	ResponseHeadersHandlerPlugin,
} from "@orpc/server/plugins";
import { createFileRoute } from "@tanstack/solid-router";
import * as routes from "../../lib/orpc/routes";

const handler = new RPCHandler(routes, {
	plugins: [
		new BatchHandlerPlugin(),
		new CORSHandlerPlugin({
			origin: ["*"],
			allowMethods: ["GET", "HEAD", "PUT", "POST", "DELETE", "PATCH", "QUERY"],
		}),
		new RequestHeadersHandlerPlugin(),
		new ResponseHeadersHandlerPlugin(),
	],
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
