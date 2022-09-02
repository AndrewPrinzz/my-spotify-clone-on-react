import {TrackImage, TrackAuthor, TrackInfo, TrackName, Track} from 'components/lib'

function TrackTemplate({author, name, img, id}) {
  return (
    <Track key={id}>
      <TrackImage number={id}>
        <img src={img} />
      </TrackImage>
      <TrackInfo>
        <TrackAuthor>{name}</TrackAuthor>
        <TrackName>{author}</TrackName>
      </TrackInfo>
    </Track>
  )
}

export {TrackTemplate}