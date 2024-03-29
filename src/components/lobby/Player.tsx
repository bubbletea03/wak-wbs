import { currentVideoState } from "atoms";
import useInterval from "hooks/useInterval";
import { useEffect, useState } from "react";
import YouTube, { YouTubeEvent, YouTubePlayer, YouTubeProps } from "react-youtube";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { getYoutubeVideoTitle } from "utils";

export default function Player() {
  const [isPlaying, setIsPlaying] = useState(false);

  const currentVideo = useRecoilValue(currentVideoState);
  const [videoTitle, setVideoTitle] = useState("");
  const [ThumbnailVideoId, setThumbnailVideoId] = useState("");
  const [player, setPlayer] = useState<YouTubePlayer>();

  const onReady = (e: YouTubeEvent) => {};

  const onPlay = (e: YouTubeEvent) => {
    if (!isPlaying) {
      setIsPlaying(true);
      setPlayer(e.target);
    }
  };

  const opts: YouTubeProps["opts"] = {
    playerVars: {
      rel: 0,
      controls: 0,
    },
  };

  const updateVideoTitle = async (id: string) => {
    setVideoTitle(await getYoutubeVideoTitle(id));
  };

  useEffect(() => {
    if (currentVideo) {
      if (!isPlaying) {
        setThumbnailVideoId(currentVideo.id);
        return;
      }
      const id = currentVideo.id;
      const time =
        currentVideo.fromNum +
        Math.floor((new Date().getTime() - currentVideo.startTimeDate.getTime()) / 1000);

      player?.loadVideoById(id, time, undefined);
      updateVideoTitle(id);
    }
  }, [currentVideo]);

  return (
    <>
      <PlayerWrapper isPlaying={isPlaying}>
        {!currentVideo?.id ? (
          <div>
            <NoVideoImg src="icons/no_video.png" />
            <NoVideoText style={{ color: "white" }}>방송 준비 시간입니다.</NoVideoText>
          </div>
        ) : (
          <>
            <YouTube
              videoId={ThumbnailVideoId}
              opts={opts}
              onReady={onReady}
              onPlay={onPlay}
              onPause={(e) => e.target.playVideo()}
            />
          </>
        )}
      </PlayerWrapper>
      <VideoTitle>{videoTitle}</VideoTitle>
    </>
  );
}

const NoVideoText = styled.div`
  text-align: center;
  color: white;
`;

const VideoTitle = styled.div`
  margin: 5px 30px;
`;

const PlayerWrapper = styled.div<{ isPlaying: boolean }>`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  max-width: 650px;
  margin: 0 auto;
  background-color: black;
  height: fit-content;
  box-sizing: border-box;
  ${(props) => props.isPlaying && `pointer-events: none;`}

  iframe {
    display: block;
    box-sizing: content-box;
    width: 100vw;
    height: 56.25vw; // 16:9 ratio
    max-width: 650px;
    max-height: 365.625px;
    border-bottom: 7px solid #2a1305;
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
  }
`;

const NoVideoImg = styled.img`
  width: 100%;
  max-width: 650px;
`;
