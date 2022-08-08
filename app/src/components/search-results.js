/** @jsxImportSource @emotion/react */
import {jsx} from '@emotion/react'

function SearchResults({track, chooseTrack}) {
  function handlePlay() {
    chooseTrack(track)
  }

  return (
    <div 
      style={{
      cursor: 'pointer',
    }}
      onClick={handlePlay}
    >
      {track.artist} — {track.title}
    </div>
  )
}

export {SearchResults}