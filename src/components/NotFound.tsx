import { Link } from "@tanstack/solid-router";

export const NotFound = () => {
	return (
		<main class="text-center mx-auto text-gray-700 p-4">
			<h1 class="max-6-xs text-6xl text-sky-700 font-thin uppercase my-16">
				Not Found
			</h1>
			<p class="mt-8">
				Visit{" "}
				<a
					href="https://solidjs.com"
					target="_blank"
					class="text-sky-600 hover:underline"
					rel="noopener"
				>
					solidjs.com
				</a>{" "}
				to learn how to build Solid apps.
			</p>
			<p class="my-4">
				<Link to="/" class="text-sky-600 hover:underline">
					Home
				</Link>
				{" - "}
				<Link to="/about" class="text-sky-600 hover:underline">
					About Page
				</Link>
			</p>
		</main>
	);
};
