// @refresh reload
import "@fontsource/plus-jakarta-sans/variable.css";
import { QueryClient, QueryClientProvider } from "@tanstack/solid-query";
import "@unocss/reset/tailwind.css";
import { Suspense, createSignal } from "solid-js";
import {
  Body,
  ErrorBoundary,
  FileRoutes,
  Head,
  Html,
  Meta,
  Routes,
  Scripts,
  Title,
} from "solid-start";
import { httpBatchLink } from "solid-trpc";
import "uno.css";
import { getAuthTokenSignal } from "./components/hooks/useSpotifyAuth";
import { trpc } from "./utils/trpc";

const getBaseUrl = () => {
  if (typeof window !== "undefined") return "";
  return `http://localhost:${process.env.PORT ?? 3000}`;
};

export default function Root() {
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
    <Html lang="en">
      <Head>
        <Title>Spotify Desk Thing</Title>

        <Meta charset="utf-8" />
        <Meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta name="theme-color" content="#000000" />
      </Head>
      <Body class="bg-black" style={{ "font-family": "'Plus Jakarta SansVariable'" }}>
        <trpc.Provider client={trpcClient()} queryClient={queryClient()}>
          <QueryClientProvider client={queryClient()}>
            <Suspense>
              <ErrorBoundary>
                <Routes>
                  <FileRoutes />
                </Routes>
              </ErrorBoundary>
            </Suspense>
          </QueryClientProvider>
        </trpc.Provider>
        <Scripts />
      </Body>
    </Html>
  );
}
