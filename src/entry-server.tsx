// @refresh reload
import { createHandler, StartServer } from "@solidjs/start/server";

export default createHandler(() => (
  <StartServer
    document={({ assets, children, scripts }) => (
      <html lang="en">
        <head>
          <title>Spotify Desk Thing</title>
          <meta charset="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta name="theme-color" content="#000000" />
          {assets}
        </head>
        <body
          class="bg-black"
          style={{ "font-family": "'Plus Jakarta Sans Variable'" }}
        >
          <div id="app">{children}</div>
          {scripts}
        </body>
      </html>
    )}
  />
));
