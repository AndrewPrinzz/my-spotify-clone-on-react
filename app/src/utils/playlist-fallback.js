import fallbackSpotify from 'assets/img/spotify/fallback-spotify.jpg'

const loadingPlaylist = {
  "album": {
    "images": [
      {
        "height": 640,
        "url": fallbackSpotify,
        "width": 640
      },
      {
        "height": 300,
        "url": fallbackSpotify,
        "width": 300
      },
      {
        "height": 64,
        "url": fallbackSpotify,
        "width": 64
      }
    ]
  },
}

const loadingPlaylists = (length) => Array.from({ length: length }, (v, index) => ({
  ...loadingPlaylist,
  "album": {
    "id": `loading-playlist-${index}`,
    ...loadingPlaylist.album
  },
}))

export {loadingPlaylist, loadingPlaylists}