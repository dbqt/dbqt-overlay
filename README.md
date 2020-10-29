# Dbqt-Overlay
This was a fork and customization of [Freakylay](https://github.com/UnskilledFreak/Freakylay).

I really liked Freakylay's version, but it had too much information for me, so I trimed the overlay and simplified it a lot.

![dbqt-overlay preview gif](https://media.giphy.com/media/57l8R9YCoZwKOlxJR7/giphy.gif)

## Features

- Change **background and font color like you want**, even with transparency
- Supports long and short names for song names, song sub names, artist names, and mapper names.
- Displays current bsr code.
- Displays current progress of the song in a similar way as [Resilim's overlay](https://github.com/Reselim/beat-saber-overlay).
- Supports flipping to right or left.
- Optionally displays BPM, NJS and combo.

## How do I use this?

- You need to install [kOFReadie's BSDataPuller](https://github.com/kOFReadie/BSDataPuller) first.
- Then grab one of the latest [release](https://github.com/dbqt/dbqt-overlay/releases) of this overlay.
- Unzip the entire folder somewhere you want to keep it.
- Open the index.html file with your favorite browser.
- Double-click somewhere on the page. (You can close the settings panel simply by double-clicking anywhere)
- Customize the overlay to your liking.
- Copy the bottom url to OBS as a browser source. (Set browser source's width to your stream's horitonzal resolution, and the height to 160 pixels.)
- Close the page, you don't need to open the index file every time. This is just to do the initial setup.

### List of all parameters:

|Parameter|Info
|---|---|
|ip=\<ip\>|IP to connect to any game running DataPuller Mod in the local network, default is 127.0.0.1|
|a|background color in rgba or hex|
|b|text color in rgba or hex|
|f|do not display BPM|
|g|do not display NJS|
|h|do not display Combo|

### Other things
Feel free to copy this overlay and change it further if you want to!

Also feel free to suggest any changes!

Big thank you to kOFReadie for creating [BSDataPuller](https://github.com/kOFReadie/BSDataPuller).

Big thank you to UnskilledFreak for creating [Freakylay](https://github.com/UnskilledFreak/Freakylay).
