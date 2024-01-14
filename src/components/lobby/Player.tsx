import useInterval from "hooks/useInterval";
import { useEffect, useState } from "react";
import YouTube, { YouTubeEvent, YouTubePlayer, YouTubeProps } from "react-youtube";
import { loadScheduleToday } from "schedule";
import styled from "styled-components";
import { getYoutubeVideoTitle } from "utils";

export default function Player() {
  const [isPlaying, setIsPlaying] = useState(false);

  const [currentVideoState, setCurrentVideoState] = useState({ id: "", time: 0, title: "" });
  const [ThumbnailVideoId, setThumbnailVideoId] = useState("");
  const [player, setPlayer] = useState<YouTubePlayer>();
  const scheduleToday = loadScheduleToday();

  const onReady = (e: YouTubeEvent) => {};

  const onPlay = (e: YouTubeEvent) => {
    if (!isPlaying) {
      setIsPlaying(true);
      setPlayer(e.target);
      updateCurrentVideo();
    }
  };

  const opts: YouTubeProps["opts"] = {
    playerVars: {
      rel: 0,
      controls: 0,
    },
  };

  const updateCurrentVideo = async () => {
    const currentVideo = scheduleToday?.getCurrentVideo();
    if (currentVideo) {
      if (!isPlaying) setThumbnailVideoId(currentVideo.id);
      const id = currentVideo.id;
      const time =
        currentVideo.fromNum +
        Math.floor((new Date().getTime() - currentVideo.startTimeDate.getTime()) / 1000);
      const title = await getYoutubeVideoTitle(currentVideo.id);
      setCurrentVideoState((prev) => ({ ...prev, id, time, title }));
    }
  };

  useInterval(updateCurrentVideo, 1000);
  useEffect(() => {
    updateCurrentVideo();
  }, []);

  useEffect(() => {
    if (isPlaying) {
      player?.loadVideoById(currentVideoState.id, currentVideoState.time, undefined);
    }
  }, [currentVideoState.id]);

  return (
    <>
      <PlayerWrapper>
        {currentVideoState.id == "" || undefined ? (
          <div>
            <NoVideoImg src="icons/no_video.png" />
            <NoVideoText style={{ color: "white" }}>방송 준비 시간입니다.</NoVideoText>
          </div>
        ) : (
          <YouTube
            videoId={ThumbnailVideoId}
            opts={opts}
            onReady={onReady}
            onPlay={onPlay}
            onPause={(e) => e.target.playVideo()}
          />
        )}
      </PlayerWrapper>
      <VideoTitle>{currentVideoState.title}</VideoTitle>
      <button onClick={() => player?.setVolume(100)}>테스트 버튼</button>
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

const NoVideoImg = styled.img`
  width: 100%;
  height: 100%;
`;
