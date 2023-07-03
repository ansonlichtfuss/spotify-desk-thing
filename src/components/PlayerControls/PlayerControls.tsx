import { Component, createMemo } from "solid-js";
import { trpc } from "~/utils/trpc";
import SvgEmptyHeart from "../icons/bx-heart.svg";
import SvgPause from "../icons/bx-pause.svg";
import SvgPlay from "../icons/bx-play.svg";
import SvgShuffle from "../icons/bx-shuffle.svg";
import SvgSkipNext from "../icons/bx-skip-next.svg";
import SvgSkipPrevious from "../icons/bx-skip-previous.svg";
import SvgSolidHeart from "../icons/bxs-heart.svg";
import PlayerControlIcon from "./PlayerControlIcon";
import PlayerProgressBar from "./PlayerProgressBar";

interface PlayerControlsType {
  isSaved: boolean;
}

const PlayerControls: Component<PlayerControlsType> = (props) => {
  const nowPlaying = trpc.metadata.nowPlaying.useQuery();
  const shouldDisableControls = createMemo(
    () =>
      nowPlaying.data === undefined ||
      !nowPlaying.data?.device ||
      nowPlaying.data?.device?.is_restricted
  );

  const utils = trpc.useContext();
  const onSuccessMutator = () => ({
    onSuccess: () => {
      utils.metadata.nowPlaying.invalidate();
    },
  });
  const setShuffle = trpc.actions.shuffle.useMutation(onSuccessMutator);
  const setPrevious = trpc.actions.previous.useMutation(onSuccessMutator);
  const setPause = trpc.actions.pause.useMutation(onSuccessMutator);
  const setPlay = trpc.actions.play.useMutation(onSuccessMutator);
  const setNext = trpc.actions.next.useMutation(onSuccessMutator);

  return (
    <div
      class="hidden fixed w-full left-0 bottom-0 flex items-center justify-between px-10"
      style={{
        "background-color": "rgba(0,0,0,0.2)",
        height: "120px",
        "align-items": "center",
      }}
    >
      <PlayerProgressBar />
      <PlayerControlIcon
        src={SvgShuffle}
        isDisabled={shouldDisableControls()}
        showActiveIndicator={nowPlaying.data?.shuffle_state}
        onClick={() => setShuffle.mutate({ state: !nowPlaying.data?.shuffle_state })}
      />
      <PlayerControlIcon
        src={SvgSkipPrevious}
        isDisabled={shouldDisableControls()}
        enlargeIcon={true}
        onClick={setPrevious.mutate}
      />
      {nowPlaying.data?.is_playing ? (
        <PlayerControlIcon
          src={SvgPause}
          isDisabled={shouldDisableControls()}
          enlargeIcon={true}
          onClick={setPause.mutate}
        />
      ) : (
        <PlayerControlIcon
          src={SvgPlay}
          isDisabled={shouldDisableControls()}
          enlargeIcon={true}
          onClick={setPlay.mutate}
        />
      )}
      <PlayerControlIcon
        src={SvgSkipNext}
        isDisabled={shouldDisableControls()}
        enlargeIcon={true}
        onClick={setNext.mutate}
      />
      <PlayerControlIcon
        src={props.isSaved ? SvgSolidHeart : SvgEmptyHeart}
        isDisabled={shouldDisableControls()}
      />
    </div>
  );
};

export default PlayerControls;
