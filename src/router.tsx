import { createRouter as createTanStackRouter } from "@tanstack/solid-router";
import { queryClient } from "./lib/query-client";
import { routeTree } from "./routeTree.gen";

export function getRouter() {
	const router = createTanStackRouter({
		routeTree,
		context: queryClient,
		scrollRestoration: true,
		defaultPreload: "intent",
		defaultPreloadStaleTime: 0,
		defaultNotFoundComponent: () => "RnR 404 badddd",
	});

	return router;
}

declare module "@tanstack/solid-router" {
	interface Register {
		router: ReturnType<typeof getRouter>;
	}
}
