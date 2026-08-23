import { useQuery } from "@tanstack/solid-query";
import { add } from "date-fns/add";
import { differenceInSeconds } from "date-fns/differenceInSeconds";
import { createEffect, createSignal } from "solid-js";
import { orpc } from "../orpc/client";

export const [getAuthTokenSignal, setAuthTokenSignal] = createSignal("");

export const useSpotifyAuth = () => {
	const accessTokenQuery = useQuery(() => orpc.auth.accessToken.queryOptions());

	createEffect(
		() => accessTokenQuery.data,
		() => {
			let timerReference: NodeJS.Timeout;
			if (accessTokenQuery.isSuccess && accessTokenQuery.data) {
				setAuthTokenSignal(accessTokenQuery.data.access_token);

				const calculatedExpiration = add(new Date(), {
					seconds: accessTokenQuery.data.expires_in - 600,
				});
				const diffSec = differenceInSeconds(calculatedExpiration, new Date());
				timerReference = setTimeout(() => {
					accessTokenQuery.refetch();
				}, diffSec * 1000);
			}

			return () => {
				clearTimeout(timerReference);
			};
		},
	);

	return {
		authToken: () => accessTokenQuery.data?.access_token,
		isLoading: () => accessTokenQuery.isLoading,
		accessTokenQuery,
	};
};
