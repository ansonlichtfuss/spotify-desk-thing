// @refresh reload
import "@fontsource-variable/plus-jakarta-sans";
import "@unocss/reset/tailwind.css";
import "virtual:uno.css";

import { Router } from "@solidjs/router";
import { FileRoutes } from "@solidjs/start/router";
import { QueryClient, QueryClientProvider } from "@tanstack/solid-query";
import { Suspense, createSignal } from "solid-js";
import { httpBatchLink } from "solid-trpc";
import { getAuthTokenSignal } from "./components/hooks/useSpotifyAuth";
import { trpc } from "./utils/trpc";

const getBaseUrl = () => {
  if (typeof window !== "undefined") return "";
  return `http://localhost:${process.env.PORT ?? 3000}`;
};

export default function App() {
  const [queryClient] = createSignal(new QueryClient());
  const [trpcClient] = createSignal(
    trpc.createClient({
      links: [
        httpBatchLink({
          url: `${getBaseUrl()}/api/trpc`,
          // You can pass any HTTP headers you wish here
          async headers() {
            return {
              authorization: `Bearer ${getAuthTokenSignal()}`,
            };
          },
        }),
      ],
    })
  );

  return (
    <trpc.Provider client={trpcClient()} queryClient={queryClient()}>
      <QueryClientProvider client={queryClient()}>
        <Router root={(props) => <Suspense>{props.children}</Suspense>}>
          <FileRoutes />
        </Router>
      </QueryClientProvider>
    </trpc.Provider>
  );
}
