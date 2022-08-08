import {ChartTrackImage, ChartTrackAuthor, ChartTrackInfo, ChartTrackName, ChartTrack} from 'components/lib'



function ChartTrackTemplate({author, name, img, id}) {
  return (
    <ChartTrack key={id}>
      <ChartTrackImage number={id}>
        <img src={img} />
      </ChartTrackImage>
      <ChartTrackInfo>
        <ChartTrackAuthor>{name}</ChartTrackAuthor>
        <ChartTrackName>{author}</ChartTrackName>
      </ChartTrackInfo>
    </ChartTrack>
  )
}

export {ChartTrackTemplate}