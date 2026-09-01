import { useMutation, useQuery, useQueryClient } from "@tanstack/solid-query";
import {
	BiRegularPause,
	BiRegularPlay,
	BiRegularPlusCircle,
	BiRegularShuffle,
	BiRegularSkipNext,
	BiRegularSkipPrevious,
	BiSolidCheckCircle,
} from "solid-icons/bi";
import { type Component, createMemo } from "solid-js";
import { orpc } from "../../lib/orpc/client";
import { PlayerControlIcon } from "./PlayerControlIcon";
import { PlayerProgressBar } from "./PlayerProgressBar";

interface PlayerControlsType {
	isSaved: boolean;
}

export const PlayerControls: Component<PlayerControlsType> = (props) => {
	const queryClient = useQueryClient();
	const nowPlayingQuery = useQuery(() =>
		orpc.metadata.nowPlaying.queryOptions(),
	);
	const shouldDisableControls = createMemo(
		() =>
			nowPlayingQuery.data === undefined ||
			!nowPlayingQuery.data?.device ||
			nowPlayingQuery.data?.device?.is_restricted,
	);

	const onSuccessMutator = () => {
		// slight delay to allow change to propagate through backend
		setTimeout(() => {
			nowPlayingQuery.refetch();
		}, 500);
	};

	const setShuffle = useMutation(() =>
		orpc.actions.shuffle.mutationOptions({
			onMutate: () => {
				queryClient.setQueryData(
					orpc.metadata.nowPlaying.queryKey(),
					(data) => {
						if (data) {
							return {
								...data,
								shuffle_state: !data?.shuffle_state,
							};
						}
						return data;
					},
				);
			},
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
				Icon={BiRegularShuffle}
				isDisabled={shouldDisableControls()}
				showActiveIndicator={nowPlayingQuery.data?.shuffle_state}
				onClick={() =>
					setShuffle.mutate({ state: !nowPlayingQuery.data?.shuffle_state })
				}
			/>
			<PlayerControlIcon
				Icon={BiRegularSkipPrevious}
				isDisabled={shouldDisableControls()}
				enlargeIcon={true}
				onClick={() => setPrevious.mutate()}
			/>
			{nowPlayingQuery.data?.is_playing ? (
				<PlayerControlIcon
					Icon={BiRegularPause}
					isDisabled={shouldDisableControls()}
					enlargeIcon={true}
					onClick={() => setPause.mutate()}
				/>
			) : (
				<PlayerControlIcon
					Icon={BiRegularPlay}
					isDisabled={shouldDisableControls()}
					enlargeIcon={true}
					onClick={() => setPlay.mutate()}
				/>
			)}
			<PlayerControlIcon
				Icon={BiRegularSkipNext}
				isDisabled={shouldDisableControls()}
				enlargeIcon={true}
				onClick={() => setNext.mutate()}
			/>
			<PlayerControlIcon
				Icon={props.isSaved ? BiSolidCheckCircle : BiRegularPlusCircle}
				isDisabled={shouldDisableControls()}
			/>
		</div>
	);
};
