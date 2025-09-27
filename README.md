![Screenshot of Spotify Desk Thing now playing UI](/readme-thumbnail.jpg?raw=true)

# Spotify Desk Thing

<img align="right" src="/readme-irl-pictures.gif?raw=true" alt="Animate GIF showing the real-life implementation of this project" style="width:180px;">

A web-based clone of the Spotify Car Thing's now playing UI. Provides control via the Spotify API instead of Bluetooth (no need to pair devices and it can control most playback scenarios). Requires a Premium Spotify account.

Made for the [Hyperpixel 4 Square Touch](https://shop.pimoroni.com/products/hyperpixel-4-square?variant=30138251444307) display, using a Raspberry Pi 3A.

Written in [SolidJS](https://www.solidjs.com) using [SolidStart](https://start.solidjs.com/getting-started/what-is-solidstart). The core now playing screen and play/pause functionality is working, more functionality to be added later.

## Setup

1. Clone the repo onto your local computer, then install dependencies:

```
pnpm i
```

2. Create an OAuth application in the Spotify Developer API portal: https://developer.spotify.com/dashboard
3. Add these redirect URLs to the OAuth application config

```
http://127.0.0.1:3000/auth/callback
http://127.0.0.1:3000
```

4. Make a copy of the `.env.example` file as `.env`, then enter the Spotify Client ID and secret in the env file fields. We will get the refresh token in a moment.

5. Start the development version of the application

```
pnpm dev
```

6. Navigate your browser to `127.0.0.1:3000/auth/initialize` to authenticate with Spotify. After granting access the refresh token will be displayed on screen. Copy this into the env file field for refresh token.

7. Stop the previous development run of the app, then build and start the production version

```
pnpm build
pnpm start
```

8. The app should now be fully functional. Navigate to `127.0.0.1:3000` and play a song on your Spotify account (wait up to 15 seconds or refresh the page to see the now playing screen).

## Running on Raspberry Pi

This application runs as a Node-based web app, which can be displayed in any browser. For my setup, I have a Raspberry PI 3A running [DietPi](https://dietpi.com) configured to automatically launch Chromium with a tab opened to the location and port of the UI (could be `127.0.0.1:3000`, I have the server running in a Docker container on my NAS on my local network).

- This repo includes the Dockerfile I use for my own self-hosted setup. Check the network settings, as they might be different depending on the environment.

## Wish list

- Custom podcast controls
- Investigate other playback scenarios like when DJ is speaking
- Copy better background color generation logic from the source code reconstruction:
  - https://github.com/Merlin04/superbird-webapp/blob/ccec5307cd89b1b70996f1e67de6125a91ae3929/helpers/ColorExtractor.ts

---

Credit: Other folks rooting and discovering the Spotify Car Thing is a web view running Chromium

- https://github.com/err4o4/spotify-car-thing-reverse-engineering/issues
- Icons:
  - Font Awesome
  - https://thenounproject.com/icon/add-button-3387958/
  - https://thenounproject.com/icon/tick-3923816/
