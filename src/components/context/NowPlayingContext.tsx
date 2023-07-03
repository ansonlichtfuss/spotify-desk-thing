import { children, createContext, ParentComponent, useContext } from "solid-js";
import { createStore } from "solid-js/store";
import { useSpotifyAuth } from "../hooks/useSpotifyAuth";
import {
  getSpotifyNowPlaying,
  getSpotifySaved,
  setSpotifyNext,
  setSpotifyPause,
  setSpotifyPlay,
  setSpotifyPrevious,
  setSpotifyShuffle
} from "../_utils/apiHelpers";
import { trpc } from "~/utils/trpc";


type NowPlayingContextType = {
  state: {
    nowPlaying: SpotifyApi.CurrentPlaybackResponse | undefined;
    nowPlayingProgressMs: number;
    // manuallyDisableControls: boolean;
    isTrackSaved: boolean;
  },
  actions: {
    nowPlayingQuery: typeof trpc.metadata.nowPlaying;
    getNowPlaying: () => Promise<void>;
    setPause: () => Promise<void>;
    setPlay: () => Promise<void>;
    setPrevious: () => Promise<void>;
    setNext: () => Promise<void>;
    setShuffle: () => Promise<void>;
    getSaved: (id: string) => Promise<void>;
    setNowPlayingProgressMs: (callbackMs: (current: number) => number) => void;
  }
};

const defaultState: NowPlayingContextType['state'] = {
  nowPlaying: undefined,
  nowPlayingProgressMs: 0,
  // manuallyDisableControls: false,
  isTrackSaved: false
};

const NowPlayingStateContext = createContext<NowPlayingContextType['state']>(defaultState);

const NowPlayingActionsContext = createContext();

export const NowPlayingContextProvider: ParentComponent = (props) => {
  const [state, setState] = createStore(defaultState);
  const nowPlayingQuery = trpc.metadata.nowPlaying.useQuery();

  // const getNowPlaying = async () => {
  //   const response = await getSpotifyNowPlaying(accessToken);

  //   if (response.item?.id && response.item?.id !== state.nowPlaying?.item?.id) {
  //     getSaved(response.item?.id);
  //   }

  //   setState({
  //     nowPlaying: response,
  //     nowPlayingProgressMs: response.progress_ms ?? 0,
  //     manuallyDisableControls: false
  //   })
  // };

  const setPause = async () => {
    const response = await setSpotifyPause(accessToken);
    setTimeout(() => nowPlayingQuery.refetch(), 100);
  };

  const setPlay = async () => {
    const response = await setSpotifyPlay(accessToken);
    setTimeout(() => nowPlayingQuery.refetch(), 100);
  };

  const setPrevious = async () => {
    const response = await setSpotifyPrevious(accessToken);
    setTimeout(() => nowPlayingQuery.refetch(), 100);
  }

  const setNext = async () => {
    const response = await setSpotifyNext(accessToken);
    setTimeout(() => nowPlayingQuery.refetch(), 100);
  }

  const setShuffle = async () => {
    const response = await setSpotifyShuffle(accessToken, !state.nowPlaying?.shuffle_state);
    setTimeout(() => nowPlayingQuery.refetch(), 100);
  }

  const getSaved = async (id: string) => {
    const response = await getSpotifySaved(accessToken, id);
    setState({ isTrackSaved: !!response[0] })
  }

  const setNowPlayingProgressMs = (callbackMs: (current: number) => number) => {
    setState(current => ({ nowPlayingProgressMs: callbackMs(current.nowPlayingProgressMs) }))
  }

  return (
    <NowPlayingStateContext.Provider value={state}>
      <NowPlayingActionsContext.Provider value={{ nowPlayingQuery, setPause, setPlay, setPrevious, setNext, setShuffle, getSaved, setNowPlayingProgressMs }}>
        {children(() => props.children)()}
      </NowPlayingActionsContext.Provider>
    </NowPlayingStateContext.Provider>
  );
};

export const useNowPlayingStateContext = () => useContext(NowPlayingStateContext);
export const useNowPlayingActionsContext = () => useContext(NowPlayingActionsContext);
