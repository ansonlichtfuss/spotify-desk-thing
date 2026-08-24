import { useQuery } from "@tanstack/solid-query";
import {
	type Component,
	createEffect,
	createMemo,
	createSignal,
} from "solid-js";
import { orpc } from "../../lib/orpc/client";

export const PlayerProgressBar: Component = () => {
	const [progressMs, setProgressMs] = createSignal(0);
	const nowPlaying = useQuery(() => orpc.metadata.nowPlaying.queryOptions());

	createEffect(
		() => nowPlaying.data?.progress_ms,
		(progress_ms) => {
			if (progress_ms !== undefined && progress_ms !== null) {
				setProgressMs(progress_ms);
			}
		},
	);

	createEffect(
		() => nowPlaying.data?.is_playing,
		(is_playing) => {
			let progressInterval: NodeJS.Timeout;
			if (is_playing) {
				progressInterval = setInterval(
					() => setProgressMs((current) => current + 1000),
					1000,
				);
			}

			return () => {
				clearInterval(progressInterval);
			};
		},
	);

	const playingProgress = createMemo(
		() => progressMs() / (nowPlaying.data?.item?.duration_ms || 1),
	);

	return (
		<div class="absolute top-0 left-0 w-full">
			<div
				class="absolute top-0 left-0 w-full origin-left"
				style={{ height: "3px", "background-color": "rgba(0,0,0,0.2)" }}
			></div>
			<div
				class="absolute top-0 left-0 w-full origin-left bg-white"
				style={{
					height: "3px",
					transform: `scaleX(${playingProgress()})`,
				}}
			></div>
		</div>
	);
};
