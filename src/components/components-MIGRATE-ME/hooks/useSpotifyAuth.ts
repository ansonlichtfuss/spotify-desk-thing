// import { add } from "date-fns/add";
// import { differenceInSeconds } from "date-fns/differenceInSeconds";
// import { createEffect, createSignal, createStore } from "solid-js";
// // import { trpc } from "~/utils/trpc";
// import type { SpotifyAuthState } from "../../../lib/trpc-MIGRATE-ME/router/auth";

import { createSignal } from "solid-js";

const defaultState = {
	access_token: "",
	token_type: "",
	expires_in: 0,
	scope: "",
	calculatedExpiration: new Date(),
	timerReference: -1,
};

export const [getAuthTokenSignal, setAuthTokenSignal] = createSignal("");

// export const useSpotifyAuth = () => {
// 	const [state, setState] = createStore<SpotifyAuthState>(defaultState);
// 	// const accessTokenQuery = trpc.auth.accessToken.useQuery();
// 	const accessTokenQuery = () => null;
// 	console.log(
// 		"hey tiff",
// 		accessTokenQuery.isSuccess,
// 		accessTokenQuery.data,
// 		accessTokenQuery.error,
// 		accessTokenQuery.failureReason,
// 	);

// 	createEffect(
// 		() => accessTokenQuery.data,
// 		() => {
// 			let timerReference: NodeJS.Timeout;
// 			if (accessTokenQuery.isSuccess && accessTokenQuery.data) {
// 				console.log("hey tiff REFETCH 1", accessTokenQuery.data);
// 				setAuthTokenSignal(accessTokenQuery.data.access_token);

// 				const calculatedExpiration = add(new Date(), {
// 					seconds: accessTokenQuery.data.expires_in - 600,
// 				});
// 				const diffSec = differenceInSeconds(calculatedExpiration, new Date());
// 				// timerReference = setTimeout(() => {
// 				//   console.log("hey tiff REFETCH");
// 				//   accessTokenQuery.refetch();
// 				// }, diffSec * 1000);
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
