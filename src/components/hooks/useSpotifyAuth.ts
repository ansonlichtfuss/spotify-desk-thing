import { add } from "date-fns/add";
import { differenceInSeconds } from "date-fns/differenceInSeconds";
import isAfter from "date-fns/isAfter";
import { createEffect, createSignal } from "solid-js";
import { createStore } from "solid-js/store";
import { SpotifyAuthState } from "~/server/trpc/router/auth";
import { trpc } from "~/utils/trpc";

const defaultState = {
  access_token: "",
  token_type: "",
  expires_in: 0,
  scope: "",
  calculatedExpiration: new Date(),
  timerReference: -1,
};

export const [getAuthTokenSignal, setAuthTokenSignal] = createSignal("");

export const useSpotifyAuth = () => {
  const [state, setState] = createStore<SpotifyAuthState>(defaultState);
  const accessTokenQuery = trpc.auth.accessToken.useQuery();

  createEffect(() => {
    let timerReference = -1;
    if (accessTokenQuery.isSuccess && accessTokenQuery.data) {
      setAuthTokenSignal(accessTokenQuery.data.access_token);

      const calculatedExpiration = add(new Date(), {
        seconds: accessTokenQuery.data.expires_in - 600,
      });
      const diffSec = differenceInSeconds(calculatedExpiration, new Date());
      timerReference = setTimeout(
        () => accessTokenQuery.refetch(),
        diffSec * 1000
      );
    }

    return () => {
      clearTimeout(timerReference);
    };
  });

  return {
    authToken: () => accessTokenQuery.data?.access_token,
    isLoading: () => accessTokenQuery.isLoading,
    accessTokenQuery,
  };
};
