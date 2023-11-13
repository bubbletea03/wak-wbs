import { useEffect, useState } from "react";
import YouTube, { YouTubeEvent, YouTubePlayer, YouTubeProps } from "react-youtube";
import { loadScheduleToday } from "schedule";
import styled from "styled-components";
import { getYoutubeVideoTitle } from "utils";

export default function Player() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isCurrentVideoNotFound, setIsCurrentVideoNotFound] = useState(false);

  const [currentVideoId, setCurrentVideoId] = useState("lM-G5ScFOEw");
  const [currentVideoTime, setCurrentVideoTime] = useState(0);
  const [currentVideoTitle, setCurrentVideoTitle] = useState("");
  const [player, setPlayer] = useState<YouTubePlayer>();
  const scheduleToday = loadScheduleToday();

  const onReady = (e: YouTubeEvent) => {};

  const onPlay = async (e: YouTubeEvent) => {
    if (!isPlaying) {
      setIsPlaying(true);
      setPlayer(e.target);

      const currentVideo = scheduleToday?.getCurrentVideo();
      if (currentVideo) {
        const videoTime = (new Date().getTime() - currentVideo.startTimeDate.getTime()) / 1000;

        setCurrentVideoId(currentVideo.id);
        setCurrentVideoTime(videoTime);
      } else setIsCurrentVideoNotFound(true);

      const videoTitle = await getYoutubeVideoTitle(currentVideoId);
      setCurrentVideoTitle(videoTitle);
    }
  };

  const opts: YouTubeProps["opts"] = {
    playerVars: {
      // controls: 0,
    },
  };

  useEffect(() => {
    if (isPlaying) {
      console.log(currentVideoId, currentVideoTime);
      player?.loadVideoById(currentVideoId, currentVideoTime, undefined);
    }
  }, [currentVideoId]);

  return (
    <>
      <PlayerWrapper>
        {isCurrentVideoNotFound ? (
          <div style={{ color: "white" }}>방송 준비 시간입니다.</div>
        ) : (
          <YouTube
            videoId="2g811Eo7K8U"
            opts={opts}
            onReady={onReady}
            onPlay={onPlay}
            onPause={(e) => e.target.playVideo()}
          />
        )}
      </PlayerWrapper>
      <div>{currentVideoTitle}</div>
    </>
  );
}

const PlayerWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: fit-content;
  background-color: black;
  box-sizing: border-box;

  iframe {
    display: block;
    box-sizing: content-box;
    width: 100vw;
    height: 56.25vw; // 16:9 ratio
    max-width: 700px;
    max-height: 393.75px;
  }
`;
