import { createContext, useContext, ParentComponent } from "solid-js";
import { createStore } from "solid-js/store";
import add from "date-fns/add";
import isAfter from "date-fns/isAfter";
import { getSpotifyAccessToken } from "~/utils/apiHelpers";

export type SpotifyAuthContextState = {
  readonly access_token: string;
  readonly token_type: string;
  readonly expires_in: number;
  readonly scope: string;
  readonly calculatedExpiration: Date;
};
export type SpotifyAuthContextValue = [
  state: SpotifyAuthContextState,
  actions: {
    getToken: () => Promise<string>;
  }
];

const defaultState = {
  access_token: "",
  token_type: "",
  expires_in: 0,
  scope: "",
  calculatedExpiration: new Date(),
};

const SpotifyAuthContext = createContext<SpotifyAuthContextValue>([
  defaultState,
  {
    getToken: async () => '',
  },
]);

export const SpotifyAuthProvider: ParentComponent = (props) => {
  const [state, setState] = createStore(defaultState);

  const getToken = async () => {
    console.log("hey tiff get token");
    if (isAfter(new Date(), state.calculatedExpiration)) {
      console.log("hey tiff get token EXPIRED, getting new one");
      const response = await getSpotifyAccessToken();
      setState({
        ...response,
        calculatedExpiration: add(new Date(), {
          seconds: response.expires_in - 600,
        }),
      });
      console.log("hey tiff auth", state);
      return response.access_token;
    } else {
      console.log("hey tiff get token cached, returning");
      return state.access_token;
    }
  };

  return (
    <SpotifyAuthContext.Provider value={[state, { getToken }]}>
      {props.children}
    </SpotifyAuthContext.Provider>
  );
};

export const useSpotifyAuth = () => useContext(SpotifyAuthContext);
