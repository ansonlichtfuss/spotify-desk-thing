import { extractColors } from "extract-colors";
import {
  Accessor,
  Component,
  createEffect,
  createMemo,
  createSignal,
  onCleanup,
} from "solid-js";
import {
  getSpotifyNowPlaying,
  setSpotifyPause,
  setSpotifyPlay,
} from "~/utils/apiHelpers";
import { useSpotifyAuth } from "../context/SpotifyAuthContext";
import DynamicBackground from "./DynamicBackground";
import SvgEmptyHeart from "./icons/bx-heart.svg";
import SvgMusic from "./icons/bx-music.svg";
import SvgPause from "./icons/bx-pause.svg";
import SvgPlay from "./icons/bx-play.svg";
import SvgShuffle from "./icons/bx-shuffle.svg";
import SvgSkipNext from "./icons/bx-skip-next.svg";
import SvgSkipPrevious from "./icons/bx-skip-previous.svg";
import PlayerControlIcon from "./PlayerControlIcon";

const PREVIEW_SIZE = 400;

const getAlbumMetadata = ({ album, name }: { album: AlbumMetadata, name: string }) => ({
  preview: album.images[0].url,
  title: name,
  subtitle: album.artists.map((artist) => artist.name).join(", "),
});

const getEpisodeMetadata = (episode: EpisodeMetadata) => ({
  preview: episode.images[0].url,
  title: episode.name,
  subtitle: episode.show.name,
});

const metadataMappers: Record<
  SpotifyApi.CurrentlyPlayingObject["currently_playing_type"],
  (item: any) => UiMetadata
> = {
  track: getAlbumMetadata,
  episode: getEpisodeMetadata,
  ad: (e) => e, // TODO
  unknown: (e) => e, // TODO
};

const SpotifyNowPlaying: Component = () => {
  const [_, { getToken }] = useSpotifyAuth();
  const [nowPlaying, setNowPlaying] =
    createSignal<SpotifyApi.CurrentPlaybackResponse>();
  const [nowPlayingProgressMs, setNowPlayingProgressMs] = createSignal(0);
  const [manuallyDisableControls, setManuallyDisableControls] = createSignal(false);

  const getNowPlaying = async () => {
    const accessToken = await getToken();
    if (!accessToken) return;

    const response = await getSpotifyNowPlaying(accessToken);
    setNowPlaying(response);
    setNowPlayingProgressMs(response.progress_ms ?? 0);
    setManuallyDisableControls(false);
  };

  const setPause = async () => {
    setManuallyDisableControls(true);
    const accessToken = await getToken();
    if (!accessToken) return;
    
    const response = await setSpotifyPause(accessToken);
    setTimeout(() => getNowPlaying(), 100);
  };

  const setPlay = async () => {
    setManuallyDisableControls(true);
    const accessToken = await getToken();
    if (!accessToken) return;
    
    const response = await setSpotifyPlay(accessToken);
    setTimeout(() => getNowPlaying(), 100);
  };

  // Now playing algorithm
  createEffect(() => {
    if (nowPlaying() === undefined) {
      getNowPlaying();
    }
  });

  createEffect(() => {
    let interval: number;
    let progressInterval: number;
    const thisNowPlaying = nowPlaying();
    if (thisNowPlaying !== undefined) {
      let refreshTimeout = thisNowPlaying.is_playing ? 8000 : 15000;

      const songDuration = thisNowPlaying.item?.duration_ms ?? 0;
      const currentProgress = thisNowPlaying.progress_ms ?? 0;

      const timeLeftOnSong = songDuration - currentProgress;
      if (thisNowPlaying.is_playing && timeLeftOnSong < refreshTimeout) {
        refreshTimeout = timeLeftOnSong + 1000;
      }

      interval = setInterval(() => getNowPlaying(), refreshTimeout);
      if (thisNowPlaying?.is_playing) {
        progressInterval = setInterval(
          () => setNowPlayingProgressMs((current) => current + 1000),
          1000
        );
      }
    }

    onCleanup(() => {
      clearInterval(interval);
      clearInterval(progressInterval);
    });
  });

  const shouldDisableControls = createMemo(() =>
    manuallyDisableControls() ||
    nowPlaying() === undefined ||
    !nowPlaying()?.device ||
    nowPlaying()?.device?.is_restricted);

  const playingProgress = createMemo(
    () => nowPlayingProgressMs() / (nowPlaying()?.item?.duration_ms || 1)
  );

  const metadata = createMemo<UiMetadata>(() => {
    const mapperKey = nowPlaying()?.currently_playing_type ?? "track";
    const mapper = metadataMappers[mapperKey];

    return mapper && nowPlaying()?.item && mapper(nowPlaying()?.item) || {
      preview: '',
      title: '',
      subtitle: '',
    };
  });


  return (
    <DynamicBackground imgUrl={metadata()?.preview}>
      <div class="flex flex-col items-center">
        <div
          class="bg-gray-800 relative flex items-center justify-center color-gray-500"
          style={{
            width: `${PREVIEW_SIZE}px`,
            height: `${PREVIEW_SIZE}px`,
          }}
        >
          <div class="absolute z-0">
            <img
              src={SvgMusic}
              width={`${PREVIEW_SIZE / 2}px`}
              height={`${PREVIEW_SIZE / 2}px`}
            />
          </div>
          <div
            class="relative z-10"
            style={{
              width: `${PREVIEW_SIZE}px`,
              height: `${PREVIEW_SIZE}px`,
              "background-image": `url(${metadata()?.preview})`,
              "background-position": "center center",
              "background-repeat": "no-repeat",
              "background-size": "contain",
            }}
          />
        </div>
        <p class="font-extrabold text-5xl pt-7 pb-2 text-ellipsis overflow-hidden whitespace-nowrap max-w-xl leading-lg">
          {metadata()?.title}
        </p>
        <p class="opacity-75 text-2xl font-bold text-ellipsis overflow-hidden whitespace-nowrap max-w-xl">{metadata()?.subtitle}</p>
      </div>
      <div
        class="hidden fixed w-full left-0 bottom-0 flex items-center justify-between px-10"
        style={{
          "background-color": "rgba(0,0,0,0.2)",
          height: "120px",
          "align-items": "center",
        }}
      >
        <div
          class="absolute top-0 left-0 w-0 w-full origin-left"
          style={{ height: "3px", "background-color": "rgba(0,0,0,0.2)" }}
        ></div>
        <div
          class="absolute top-0 left-0 w-0 w-full scale-x-0 origin-left bg-white"
          style={{ height: "3px", transform: `scaleX(${playingProgress()})` }}
        ></div>
        <PlayerControlIcon
          src={SvgShuffle}
          isDisabled={shouldDisableControls()}
          showActiveIndicator={nowPlaying()?.shuffle_state}
        />
        <PlayerControlIcon
          src={SvgSkipPrevious}
          isDisabled={shouldDisableControls()}
          enlargeIcon={true}
        />
        {nowPlaying()?.is_playing ? (
          <PlayerControlIcon
            src={SvgPause}
            isDisabled={shouldDisableControls()}
            enlargeIcon={true}
            onClick={setPause}
          />
        ) : (
          <PlayerControlIcon
            src={SvgPlay}
            isDisabled={shouldDisableControls()}
            enlargeIcon={true}
            onClick={setPlay}
          />
        )}
        <PlayerControlIcon
          src={SvgSkipNext}
          isDisabled={shouldDisableControls()}
          enlargeIcon={true}
        />
        <PlayerControlIcon
          src={SvgEmptyHeart}
          isDisabled={shouldDisableControls()}
        />
      </div>
    </DynamicBackground>
  );
};

export default SpotifyNowPlaying;
