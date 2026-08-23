import {
  Component,
  createEffect,
  createMemo,
  createSignal,
  onCleanup,
} from "solid-js";
import { trpc } from "~/utils/trpc";

const PlayerProgressBar: Component = () => {
  const [progressMs, setProgressMs] = createSignal(0);
  const nowPlaying = trpc.metadata.nowPlaying.useQuery();

  createEffect(() => {
    if (nowPlaying.data?.progress_ms) {
      setProgressMs(nowPlaying.data.progress_ms);
    }
  });

  createEffect(() => {
    let progressInterval: number;
    if (nowPlaying.data?.is_playing) {
      progressInterval = setInterval(
        () => setProgressMs((current) => current + 1000),
        1000
      );
    }

    onCleanup(() => {
      clearInterval(progressInterval);
    });
  });

  const playingProgress = createMemo(
    () => progressMs() / (nowPlaying.data?.item?.duration_ms || 1)
  );

  return (
    <div class="absolute top-0 left-0 w-full">
      <div
        class="absolute top-0 left-0 w-0 w-full origin-left"
        style={{ height: "3px", "background-color": "rgba(0,0,0,0.2)" }}
      ></div>
      <div
        class="absolute top-0 left-0 w-0 w-full scale-x-0 origin-left bg-white"
        style={{
          height: "3px",
          transform: `scaleX(${playingProgress()})`,
        }}
      ></div>
    </div>
  );
};

export default PlayerProgressBar;
