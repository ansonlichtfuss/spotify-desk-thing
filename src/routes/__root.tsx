import { HydrationScript, type JSX, Loading, NoHydration } from "@solidjs/web";
import { QueryClientProvider } from "@tanstack/solid-query";
import { SolidQueryDevtools } from "@tanstack/solid-query-devtools";
import {
	createRootRouteWithContext,
	HeadContent,
	Scripts,
} from "@tanstack/solid-router";
import { TanStackRouterDevtools } from "@tanstack/solid-router-devtools";
import Header from "../components/Header";
import { queryClient } from "../lib/query-client";
import styleCss from "../styles.css?url";

export const Route = createRootRouteWithContext()({
	head: () => ({
		links: [{ rel: "stylesheet", href: styleCss }],
	}),
	shellComponent: RootComponent,
});

function RootComponent(props: { children: JSX.Element }) {
	return (
		<html lang="en">
			<head>
				<HydrationScript />
				<HeadContent />
			</head>
			<body>
				<Loading>
					<QueryClientProvider client={queryClient}>
						<Header />
						{props.children}
						<TanStackRouterDevtools />
						<NoHydration>
							<SolidQueryDevtools buttonPosition="bottom-right" />
						</NoHydration>
					</QueryClientProvider>
				</Loading>
				<Scripts />
			</body>
		</html>
	);
}
