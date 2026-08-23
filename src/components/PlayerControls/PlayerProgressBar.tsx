import { useQuery } from "@tanstack/solid-query";
import {
	type Component,
	createEffect,
	createMemo,
	createSignal,
	onCleanup,
} from "solid-js";
import { orpc } from "../../lib/orpc/client";

const PlayerProgressBar: Component = () => {
	const [progressMs, setProgressMs] = createSignal(0);
	const nowPlaying = useQuery(() => orpc.metadata.nowPlaying.queryOptions());

	createEffect(
		() => nowPlaying.data,
		() => {
			if (nowPlaying.data?.progress_ms) {
				setProgressMs(nowPlaying.data.progress_ms);
			}
		},
	);

	createEffect(
		() => nowPlaying.data,
		() => {
			let progressInterval: NodeJS.Timeout;
			if (nowPlaying.data?.is_playing) {
				progressInterval = setInterval(
					() => setProgressMs((current) => current + 1000),
					1000,
				);
			}

			onCleanup(() => {
				clearInterval(progressInterval);
			});
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
				class="absolute top-0 left-0 w-full scale-x-0 origin-left bg-white"
				style={{
					height: "3px",
					transform: `scaleX(${playingProgress()})`,
				}}
			></div>
		</div>
	);
};

export default PlayerProgressBar;
