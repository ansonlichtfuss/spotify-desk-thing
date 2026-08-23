import { createORPCClient } from "@orpc/client";
import { RPCLink } from "@orpc/client/fetch";
import type { RouterClient } from "@orpc/server";
import { createRouterClient } from "@orpc/server";
import { createTanstackQueryUtils } from "@orpc/tanstack-query";
import { createIsomorphicFn } from "@tanstack/solid-start";
import { getRequestHeaders } from "@tanstack/solid-start/server";
import * as routes from "./routes";

const getORPCClient = createIsomorphicFn()
	.server(() =>
		createRouterClient(routes, {
			/**
			 * Provide initial context if needed.
			 *
			 * Because this client instance is shared across all requests,
			 * only include context that's safe to reuse globally.
			 * For per-request context, use middleware context or pass a function as the initial context.
			 */
			context: async () => ({
				headers: getRequestHeaders(),
			}),
		}),
	)
	.client((): RouterClient<typeof routes> => {
		const link = new RPCLink({
			url: "/api/rpc",
		});

		return createORPCClient(link);
	});

export const client: RouterClient<typeof routes> = getORPCClient();

export const orpc = createTanstackQueryUtils(client, {
	prefix: "desk-thing",
});
