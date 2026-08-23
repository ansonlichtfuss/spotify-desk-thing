import { HydrationScript, type JSX, Loading } from "@solidjs/web";
import { QueryClientProvider } from "@tanstack/solid-query";
import {
	createRootRouteWithContext,
	HeadContent,
	Scripts,
} from "@tanstack/solid-router";
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
				<title>Spotify Desk Thing</title>
				<meta charset="utf-8" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<meta name="theme-color" content="#000000" />
				<HydrationScript />
				<HeadContent />
			</head>
			<body
				class="bg-black"
				style={{ "font-family": "'Plus Jakarta Sans Variable'" }}
			>
				<Loading>
					<QueryClientProvider client={queryClient}>
						<Header />
						{props.children}
						{/* <TanStackRouterDevtools /> */}
						{/* <SolidQueryDevtools buttonPosition="bottom-right" /> */}
					</QueryClientProvider>
				</Loading>
				<Scripts />
			</body>
		</html>
	);
}
