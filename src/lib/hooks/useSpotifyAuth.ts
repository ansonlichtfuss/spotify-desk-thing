// import { useQuery } from "@tanstack/solid-query";
// import { add } from "date-fns/add";
// import { differenceInSeconds } from "date-fns/differenceInSeconds";
// import { createEffect, createSignal } from "solid-js";
// import { orpc } from "../orpc/client";

// export const [getAuthTokenSignal, setAuthTokenSignal] = createSignal("");

// export const useSpotifyAuth = () => {
// 	const accessTokenQuery = useQuery(() => orpc.auth.accessToken.queryOptions());

// 	createEffect(
// 		() => ({
// 			data: accessTokenQuery.data,
// 			isLoading: accessTokenQuery.isLoading,
// 			isSuccess: accessTokenQuery.isSuccess,
// 		}),
// 		({ data, isLoading, isSuccess }) => {
// 			console.log(
// 				"hey tiff access token query",
// 				data.access_token,
// 				isLoading,
// 				isSuccess,
// 			);
// 			let timerReference: NodeJS.Timeout;
// 			if (isSuccess) {
// 				setAuthTokenSignal(data.access_token);

// 				const calculatedExpiration = add(new Date(), {
// 					seconds: data.expires_in - 600,
// 				});
// 				const diffSec = differenceInSeconds(calculatedExpiration, new Date());
// 				timerReference = setTimeout(() => {
// 					accessTokenQuery.refetch();
// 				}, diffSec * 1000);
// 			}

// 			return () => {
// 				clearTimeout(timerReference);
// 			};
// 		},
// 	);

// 	return {
// 		authToken: () => accessTokenQuery.data?.access_token,
// 		isLoading: () => accessTokenQuery.isLoading,
// 		accessTokenQuery,
// 	};
// };
