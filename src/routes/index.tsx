import { createFileRoute } from "@tanstack/solid-router";
import { App } from "../components/App";

export const Route = createFileRoute("/")({ component: Index, ssr: false });

function Index() {
	return <App />;
}
