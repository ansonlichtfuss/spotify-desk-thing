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
import "./fonts/PlusJakartaSans-VariableFont_wght.woff2";
import "inter-ui/inter.css";

export default function Root() {
  return (
    <Html lang="en">
      <Head>
        <Title>Spotify Desk Thing</Title>

        <Meta charset="utf-8" />
        <Meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta name="theme-color" content="#000000" />
        <Link
          rel="preload"
          href="/src/fonts/PlusJakartaSans-Italic-VariableFont_wght.woff2"
          as="font"
          type="font/woff2"
          crossorigin="anonymous"
        />
        <Link
          rel="preload"
          href="/src/fonts/PlusJakartaSans-VariableFont_wght.woff2"
          as="font"
          type="font/woff2"
          crossorigin="anonymous"
        />

        <Style>{`
          @font-face {
            font-family: "PlusJakartaSans";
            font-style: normal;
            font-weight: 100 900;
            src: url(/src/fonts/PlusJakartaSans-VariableFont_wght.woff2)
              format("woff2");
          }
          @font-face {
            font-family: "PlusJakartaSans";
            font-style: italic;
            font-weight: 100 900;
            src: url(/src/fonts/PlusJakartaSans-Italic-VariableFont_wght.woff2)
              format("woff2");
          }
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
