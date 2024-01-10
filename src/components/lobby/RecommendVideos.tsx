import { useEffect, useState } from "react";
import { allScheduleList } from "schedule";
import styled from "styled-components";
import { getYoutubeVideoTitle, getYtThumbnailSrc, youtubeUrlToId } from "utils";

export default function RecommendVideos() {
  const [recommendationVideos, setRecommendationVideos] = useState();

  useEffect(() => {
    const selectedVideos =
      allScheduleList[Math.floor(Math.random() * allScheduleList.length)].videos;
    selectedVideos.forEach((video) => {
      // video.title = getYoutubeVideoTitle(youtubeUrlToId(video.url)).then();
    });
    // setRecommendationVideos();
  }, []);

  return (
    <GridWrapper>
      {/* {recommendationVideos.map((url) => (
        <Video key={url}>
          <Img src={getYtThumbnailSrc(youtubeUrlToId(url))} />
          {}
        </Video>
      ))} */}
    </GridWrapper>
  );
}

const Video = styled.div`
  margin: 30px 5px;
`;

const Img = styled.img`
  width: 100%;
`;

const GridWrapper = styled.div`
  display: grid;
  width: 100%;
  grid-template-columns: 1fr 1fr;
`;
