import { useMutation, useQuery } from "@tanstack/solid-query";
import { type Component, createMemo } from "solid-js";
import { orpc } from "../../lib/orpc/client";
import SvgPause from "../icons/bx-pause.svg";
import SvgPlay from "../icons/bx-play.svg";
import SvgShuffle from "../icons/bx-shuffle.svg";
import SvgSkipNext from "../icons/bx-skip-next.svg";
import SvgSkipPrevious from "../icons/bx-skip-previous.svg";
import SvgPlusCircle from "../icons/noun-add-button.svg";
import SvgCheckmarkCircle from "../icons/noun-tick.svg";
import PlayerControlIcon from "./PlayerControlIcon";
import PlayerProgressBar from "./PlayerProgressBar";

interface PlayerControlsType {
	isSaved: boolean;
}

const PlayerControls: Component<PlayerControlsType> = (props) => {
	const nowPlayingQuery = useQuery(() =>
		orpc.metadata.nowPlaying.queryOptions(),
	);
	const shouldDisableControls = createMemo(
		() =>
			nowPlayingQuery.data === undefined ||
			!nowPlayingQuery.data?.device ||
			nowPlayingQuery.data?.device?.is_restricted,
	);

	const onSuccessMutator = () => ({
		onSuccess: () => {
			// slight delay to allow change to propagate through backend
			setTimeout(() => {
				nowPlayingQuery.refetch();
			}, 500);
		},
	});
	const setShuffle = useMutation(() =>
		orpc.actions.shuffle.mutationOptions({
			onSuccess: onSuccessMutator,
		}),
	);
	const setPrevious = useMutation(() =>
		orpc.actions.previous.mutationOptions({ onSuccess: onSuccessMutator }),
	);
	const setPause = useMutation(() =>
		orpc.actions.pause.mutationOptions({ onSuccess: onSuccessMutator }),
	);
	const setPlay = useMutation(() =>
		orpc.actions.play.mutationOptions({ onSuccess: onSuccessMutator }),
	);
	const setNext = useMutation(() =>
		orpc.actions.next.mutationOptions({ onSuccess: onSuccessMutator }),
	);

	return (
		<div
			class="fixed w-full left-0 bottom-0 flex items-center justify-between px-14"
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
				showActiveIndicator={nowPlayingQuery.data?.shuffle_state}
				onClick={() =>
					setShuffle.mutate({ state: !nowPlayingQuery.data?.shuffle_state })
				}
			/>
			<PlayerControlIcon
				src={SvgSkipPrevious}
				isDisabled={shouldDisableControls()}
				enlargeIcon={true}
				onClick={setPrevious.mutate}
			/>
			{nowPlayingQuery.data?.is_playing ? (
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
				src={props.isSaved ? SvgCheckmarkCircle : SvgPlusCircle}
				isDisabled={shouldDisableControls()}
			/>
		</div>
	);
};

export default PlayerControls;
