import React from 'react'
import fallbackSpotify from 'assets/img/spotify/fallback-spotify.jpg'
import {TrackImage, TrackAuthor, TrackInfo, TrackName, Track} from 'components/lib'
import {usePlayer, useOffset} from 'context/player-context'

const loadingTrack = {
  album: {
    artists: [
      {
        "name": "Loading..."
      }
    ],
    images: [
      {
        height: 640,
        url: fallbackSpotify,
        width: 640,
      },
      {
        height: 300,
        url: fallbackSpotify,
        width: 300
      },
      {
        height: 64,
        url: fallbackSpotify,
        width: 64,
      },
    ]
  },
  name: 'Loading...',
  uri: false
}

// specify preview of loading tracks
const loadingTracks = (length) => Array.from({length: length}, (v, index) => ({
  id: `loading-track-${index}`,
  ...loadingTrack
}))

function SpotifyTrackInfoFallback({limit, length = 10}) {
  
  return (
    <SpotifyTrackDataView data={loadingTracks(length)} />
  )
}

function SpotifyTrackDataView({data}) {
  const [, setPlayer] = usePlayer()
  const [, setOffset] = useOffset() 

  function chooseTrack(track, index) {
    console.log('track: ', track);
    console.log('index: ', index);
    // we don't have a uri if we're loading so we have to do nothing
    if (!track) return
    // setting all the track uris we have now to player

    
    setPlayer(
      data.reduce(
        (prevValue, currentValue) =>
          prevValue.concat(currentValue.uri),
        []
      )
      // track
    )
    // set track offset
    setOffset(index)
  }

  return (
    data.map(({id, album, name, uri}, index) =>
      <Track key={id}>
        <TrackImage onClick={() => chooseTrack(uri, index)}>
          <img src={album.images[0].url} />
        </TrackImage>
        <TrackInfo>
          <TrackAuthor>{album.artists[0].name}</TrackAuthor>
          <TrackName>{name}</TrackName>
        </TrackInfo>
      </Track>
    )
  )
}

export {
  SpotifyTrackInfoFallback,
  SpotifyTrackDataView,
  loadingTracks
}