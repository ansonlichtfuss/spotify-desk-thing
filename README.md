![Screenshot of Spotify Desk Thing now playing UI](/readme-thumbnail.jpg?raw=true)

# Spotify Desk Thing

A custom clone of the Spotify Car Thing now playing UI for Raspberry Pi. Providing control via the Spotify API instead of Bluetooth (no need to pair devices and it can control most playback scenarios). Requires a Premium Spotify account. 

Made for the [Hyperpixel 4 Square Touch](https://shop.pimoroni.com/products/hyperpixel-4-square?variant=30138251444307) display, using a Raspberry Pi 3A. 

Written in [SolidJS](https://www.solidjs.com) using [SolidStart](https://start.solidjs.com/getting-started/what-is-solidstart). The core now playing screen and play/pause functionality is working, more functionality to be added later.

### TODO:

- Add documentation 
- Connect the shuffle/heart buttons
- Custom podcast controls
- Investigate other playback scenarios like when DJ is speaking
- Copy better background color generation logic from the source code reconstruction:
  - https://github.com/Merlin04/superbird-webapp/blob/ccec5307cd89b1b70996f1e67de6125a91ae3929/helpers/ColorExtractor.ts

---

Credit: Other folks rooting and discovering the Spotify Car Thing is a web view running Chromium

- https://github.com/err4o4/spotify-car-thing-reverse-engineering/issues