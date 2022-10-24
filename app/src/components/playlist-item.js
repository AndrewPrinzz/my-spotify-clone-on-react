import * as colors from 'styles/colors'
import {PlaylistItem, PlayListTracks, PlayListGenre, PlayListItemIcon} from "components/lib";
import {Play} from "components/icons";

function PlaylistItemTemplate({images, tracks, playlistHeight, ...props}) {
  return (
    <PlaylistItem 
      color={colors.blue} 
      cover={images[0].url} 
      playlistHeight={playlistHeight ? `${playlistHeight}` : null}>
      <PlayListTracks>{tracks.total} tracks</PlayListTracks>
      {/* <PlayListGenre>{genre}</PlayListGenre> */}
      <PlayListItemIcon>
        <Play />
      </PlayListItemIcon>
    </PlaylistItem>
  )
}

export {PlaylistItemTemplate}