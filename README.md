![Screenshot of Spotify Desk Thing now playing UI](/readme-thumbnail.jpg?raw=true)

# Spotify Desk Thing

<img align="right" src="/readme-irl-pictures.gif?raw=true" alt="Animate GIF showing the real-life implementation of this project" style="width:180px;">

A web-based clone of the Spotify Car Thing's now playing UI. Provides control via the Spotify API instead of Bluetooth (no need to pair devices and it can control most playback scenarios). Requires a Premium Spotify account.

Made for the [Hyperpixel 4 Square Touch](https://shop.pimoroni.com/products/hyperpixel-4-square?variant=30138251444307) display, using a Raspberry Pi 3A. Written in [SolidJS 2](https://www.solidjs.com) using [TanStack Start](https://tanstack.com/start/latest).

Playback functionality:

- Play / pause
- Skip / previous track
- Toggle shuffle mode
- Save / remove from library

_Controls may be disabled when certain Spotify Connect devices are used, as the API restricts control of these._

---

**NEW RELEASE (Sept 2026):**

- **Saved tracks:** Save and remove tracks from your library.

- **Auth:** An easier authentication experience. No more copying refresh tokens, just click Log In. _Now that Spotify API expires login tokens, the app will ask to re-login every 6 months._

- **Setup:** Faster setup with generalized Docker Compose support.

- **Performance:** The app has been completely rewritten for [SolidJS v2](https://v2.solidjs.com/), migrated to [TanStack Start](https://tanstack.com/start/latest) and [ORPC](https://orpc.dev/docs/getting-started). Much of the codebase was cleaned up, duplicate/unused code removed for better maintainability.

---

## Setup with Docker Compose

1. Clone the repo onto your local computer:

```
git clone git@github.com:ansonlichtfuss/spotify-desk-thing.git
```

2. Create an OAuth application in the Spotify Developer API portal: https://developer.spotify.com/dashboard

3. Determine the URL you will run the application on, for the redirect URLs in the OAuth application config on the Spotify Web API app. By default, the app runs on:

```
http://127.0.0.1:8787/auth/callback
http://127.0.0.1:8787
```

4. Make a copy of the `.env.example` file as `.env`, then enter the Spotify Client ID and secret in the env file fields.

5. Clone the `docker-compose.example.yaml` and fill it out as needed:

```
services:
  spotify-desk-thing:
    container_name: spotify-desk-thing
    build:
      context: .
      dockerfile: Dockerfile
    env_file: ".env"
    ports:
      - "8787:8787"
    restart: unless-stopped
    volumes:
      - spotify-desk-thing-auth-cache:/usr/src/app/.auth-cache

volumes:
  spotify-desk-thing-auth-cache:
    name: spotify-desk-thing-auth-cache
```

6. Run the application: `docker-compose up -d`

7. Open the app in a browser you can easily log in to. You will see this login screen. Click to log in:

![Screenshot of Spotify Desk Thing authentication screen](/readme-auth-screenshot.png?raw=true)

8. Done! Play some music and let your new Desk Thing keep you up to date. You can save music, toggle shuffle, and control playback right from your desk.

## Running on Raspberry Pi

This application runs as a Node-based web app, which can be displayed in any browser.

For my setup, I have a Raspberry PI 3A running [DietPi](https://dietpi.com) configured to automatically launch Chromium with a tab opened to the location and port of the UI. I have the server/docker container running on a separate computer on my local network.

## Credits

Other folks rooting and discovering the Spotify Car Thing is a web view running Chromium - https://github.com/err4o4/spotify-car-thing-reverse-engineering/issues

## AI Policy

AI is not used to write the code of Spotify Desk Thing. It is sometimes used to debug and research. All outputs are verified by a human before being translated into human-written code.