

# Spotify Desk Thing

A custom clone of the Spotify Car Thing UI, providing control via the Spotify API instead of Bluetooth (no need to pair devices and it can control most playback scenarios).

Written in [SolidJS](https://www.solidjs.com) using [SolidStart](https://start.solidjs.com/getting-started/what-is-solidstart). The core now playing screen and play/pause functionality is working and running on my Raspberry Pi 3A with Hyperpixel Square.

### TODO:

- Add documentation and pictures
- Connect the shuffle/heart buttons
- Custom podcast controls
- Copy better background color generation logic from the source code reconstruction:
  - https://github.com/Merlin04/superbird-webapp/blob/ccec5307cd89b1b70996f1e67de6125a91ae3929/helpers/ColorExtractor.ts

---

Credit: Other folks rooting and discovering the Spotify Car Thing is a web view running Chromium

- https://github.com/err4o4/spotify-car-thing-reverse-engineering/issues