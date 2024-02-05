import { useEffect, useState } from "react";
import { allScheduleList } from "schedule";
import styled from "styled-components";
import { getYoutubeVideoTitle, getYtThumbnailSrc, youtubeUrlToId } from "utils";

export default function RecommendVideos() {
  const [recommendationVideoObjects, setRecommendationVideoObjects] = useState<
    { url: string; title: string }[]
  >([]);

  useEffect(() => {
    const anyOneDayVideos =
      allScheduleList[Math.floor(Math.random() * allScheduleList.length)].videos;

    anyOneDayVideos.forEach(async (video) => {
      const url = video.url;
      const title: string = video.title || (await getYoutubeVideoTitle(youtubeUrlToId(url)));
      setRecommendationVideoObjects((prev) => [...prev, { url, title }]);
    });
  }, []);

  return (
    <GridWrapper>
      {recommendationVideoObjects.map((videoObj) => (
        <a key={videoObj.url} href={videoObj.url} target="_blank">
          <Video>
            <Img src={getYtThumbnailSrc(youtubeUrlToId(videoObj.url))} />
            <div>{videoObj.title}</div>
          </Video>
        </a>
      ))}
    </GridWrapper>
  );
}

const Video = styled.div`
  margin: 10px 1vw;
  padding: 20px 5px;

  transition: background-color 0.2s;
  &:hover {
    background-color: rgba(0, 0, 0, 0.2);
  }
`;

const Img = styled.img`
  width: 100%;
`;

const GridWrapper = styled.div`
  margin-top: 30px;
  display: grid;
  width: 100%;
  grid-template-columns: 1fr 1fr;
`;
