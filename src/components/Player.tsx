import { useEffect, useState } from "react";
import YouTube, { YouTubeEvent, YouTubePlayer, YouTubeProps } from "react-youtube";
import { getScheduleToday } from "schedule";
import styled from "styled-components";

export default function Player() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isCurrentVideoNotFound, setIsCurrentVideoNotFound] = useState(false);

  const [currentVideoId, setCurrentVideoId] = useState("lM-G5ScFOEw");
  const [currentVideoTime, setCurrentVideoTime] = useState(0);
  const [player, setPlayer] = useState<YouTubePlayer>();
  const scheduleToday = getScheduleToday();

  const onReady = (e: YouTubeEvent) => {};

  const onPlay = (e: YouTubeEvent) => {
    if (!isPlaying) {
      setIsPlaying(true);
      setPlayer(e.target);

      const currentVideo = scheduleToday?.getCurrentVideo();
      if (currentVideo) {
        const videoTime = (new Date().getTime() - currentVideo.startTimeDate.getTime()) / 1000;

        setCurrentVideoId(currentVideo.id);
        setCurrentVideoTime(videoTime);
      } else setIsCurrentVideoNotFound(true);
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
    </>
  );
}

const PlayerWrapper = styled.div`
  display: flex;
  justify-content: center;
  height: 300px;
  width: 100%;
  background-color: black;

  iframe {
    height: 100%;
    aspect-ratio: 16 / 9;
  }
`;
