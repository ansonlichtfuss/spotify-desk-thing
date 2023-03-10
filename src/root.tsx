// @refresh reload
import { Suspense } from "solid-js";
import {
  useLocation,
  A,
  Body,
  ErrorBoundary,
  FileRoutes,
  Head,
  Html,
  Meta,
  Routes,
  Scripts,
  Title,
  Style,
  Link,
} from "solid-start";
import "uno.css";
import "@unocss/reset/tailwind.css";
import "@fontsource/plus-jakarta-sans/variable.css"
import "inter-ui/inter.css";

export default function Root() {
  return (
    <Html lang="en">
      <Head>
        <Title>Spotify Desk Thing</Title>

        <Meta charset="utf-8" />
        <Meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta name="theme-color" content="#000000" />

        <Style>{`
          html { font-family: "Inter", "system-ui"; }
          @supports (font-variation-settings: normal) {
            html { font-family: "Inter var", "system-ui"; }
          }
        `}</Style>
      </Head>
      <Body>
        <Suspense>
          <ErrorBoundary>
            <Routes>
              <FileRoutes />
            </Routes>
          </ErrorBoundary>
        </Suspense>
        <Scripts />
      </Body>
    </Html>
  );
}
