# Dbqt-Overlay

**IMPORTANT**
Version 2.0+ are only compatible with [BSDataPuller](https://github.com/kOFReadie/BSDataPuller/releases) version 2.0.0 and later.
If you play on Beat Saber 1.13.2 and later, please use version 2.0+
If you play on Beat Saber 1.13.1 and below, please use version 1.0.2 or below.

**UPDATE**
Version 2.0+ are a complete rewrite on my own.

Version 1.0.2 and below were a fork and customization of [Freakylay](https://github.com/UnskilledFreak/Freakylay).
I really liked Freakylay's version, but it had too much information for me, so I trimed the overlay and simplified it a lot.

![dbqt-overlay preview gif](https://media.giphy.com/media/gAoOT2kPmOto6VNIa3/giphy.gif)

## Features

- Change **background and font color like you want**, even with transparency
- Supports long and short names for song names, song sub names, artist names, and mapper names.
- Displays current bsr code.
- Displays current progress of the song in a similar way as [Resilim's overlay](https://github.com/Reselim/beat-saber-overlay).
- Supports flipping to right or left.
- Optionally displays difficulty, BPM, NJS and score.
- Optionally use rounded corners.

## How do I use this?

- You need to install [kOFReadie's BSDataPuller](https://github.com/kOFReadie/BSDataPuller) first.
- Then grab one of the latest [release](https://github.com/dbqt/dbqt-overlay/releases) of this overlay.
-- If you play on Beat Saber 1.13.2 and later, please use version 2.0+
-- If you play on Beat Saber 1.13.1 and below, please use version 1.0.2 or below.
- Unzip the entire folder somewhere you want to keep it.
- Open the index.html file with your favorite browser.
- Double-click somewhere on the page. (You can close the settings panel simply by double-clicking anywhere)
- Customize the overlay to your liking.
- Press "Apply changes"
- Copy the bottom url to OBS as a browser source. (Set browser source's width to 434px, and the height to 148px)
- DONE! Close the page, you don't need to open the index file every time. This is just to do the initial setup.

### List of all parameters:

|Parameter|Info
|---|---|
|a|show the score|
|b|show difficulty|
|c|show NJS|
|d|show BPM|
|e|use rounded corners|
|i|flip to left alignment|
|bgColor|hexcode for background color|
|alpha|alpha value for background between 0 and 1|
|textColor|hexcode for text color|

### Other things
Feel free to copy this overlay and change it further if you want to!

Also feel free to suggest any changes!

Big thank you to kOFReadie for creating [BSDataPuller](https://github.com/kOFReadie/BSDataPuller).

Big thank you to UnskilledFreak for creating [Freakylay](https://github.com/UnskilledFreak/Freakylay).
