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

function SpotifyTrackInfoFallback({limit = 10}) {
  
  return (
    <SpotifyTrackDataView data={loadingTracks(limit)} />
  )
}

function SpotifyTrackDataView({data}) {
  const [, setPlayer] = usePlayer()
  const [, setOffset] = useOffset() 

  function chooseTrack(track, index) {
    
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

  const getArtists = (artists) => {
    return artists?.reduce((prev, next, i) =>
      prev + (i >= 1 ? ', ' : '') + next.name
    , [])
  }

  return (
    data.map((data, index) =>
      <Track key={data?.id}>
        <TrackImage onClick={() => chooseTrack(data?.uri, index)}>
          <img src={data?.album.images[0].url} />
        </TrackImage>
        <TrackInfo>
          <TrackAuthor>{data?.name}</TrackAuthor>
          <TrackName>{getArtists(data?.album.artists)}</TrackName>
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