import { createContext, useContext, ParentComponent, children } from "solid-js";
import { createStore } from "solid-js/store";
import add from "date-fns/add";
import isAfter from "date-fns/isAfter";
import { getSpotifyAccessToken } from "../_utils/apiHelpers";

type SpotifyAuthState = {
  access_token: string;
  token_type: string;
  expires_in: number;
  scope: string;
  calculatedExpiration: Date;
};

const defaultState = {
  access_token: "",
  token_type: "",
  expires_in: 0,
  scope: "",
  calculatedExpiration: new Date(),
};

export const useSpotifyAuth = () => {
  const [state, setState] = createStore<SpotifyAuthState>(defaultState);

  const getToken = async () => {
    if (!isAfter(new Date(), state.calculatedExpiration)) {
      return state.access_token;
    }

    const response: SpotifyAuthState = await getSpotifyAccessToken();
    setState({
      ...response,
      calculatedExpiration: add(new Date(), {
        seconds: response.expires_in - 600,
      }),
    });

    return response.access_token;
  };

  return { getToken };
};
