import React from "react";
import {InterfaceDspr, InterfaceTitle, PlayListItems} from 'components/lib'
import {recommendedList} from "test/music-data"
import {PlaylistItemTemplate} from "components/playlist-item"

function RecentlyPlayed() {
  return (
    <>
      <InterfaceTitle>Recently played</InterfaceTitle>
      <InterfaceDspr>Playlists you’ve recently listened to</InterfaceDspr>

      <PlayListItems>
        {recommendedList.slice(0, 4).map(({ id, ...props }) => (
          <PlaylistItemTemplate playlistHeight="237" key={id} {...props} />
        ))}     
      </PlayListItems>
    </>
  )
}

export {RecentlyPlayed}