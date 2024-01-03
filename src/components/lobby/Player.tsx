import { useEffect, useState } from "react";
import YouTube, { YouTubeEvent, YouTubePlayer } from "react-youtube";
import { loadScheduleToday } from "schedule";
import styled from "styled-components";
import { getYoutubeVideoTitle } from "utils";

export default function Player() {
  const [isPlaying, setIsPlaying] = useState(false);

  const [prevVideoId, setPrevVideoId] = useState("");
  const [currentVideoState, setCurrentVideoState] = useState({ id: "", time: 0, title: "" });
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

  const updateCurrentVideo = async () => {
    const currentVideo = scheduleToday?.getCurrentVideo();
    if (currentVideo) {
      const time =
        currentVideo.fromNum + (new Date().getTime() - currentVideo.startTimeDate.getTime()) / 1000;
      setCurrentVideoState((prev) => ({ ...prev, id: currentVideo.id, time }));
      const title = await getYoutubeVideoTitle(currentVideo.id);
      setCurrentVideoState((prev) => ({ ...prev, title }));
    }
  };

  useEffect(() => {
    updateCurrentVideo();
    let interval = setInterval(updateCurrentVideo, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (isPlaying && currentVideoState.id != prevVideoId) {
      player?.loadVideoById(currentVideoState.id, currentVideoState.time, undefined);
      setPrevVideoId(currentVideoState.id);
    }
  }, [currentVideoState]);

  return (
    <>
      <PlayerWrapper>
        {currentVideoState.id == "" || undefined ? (
          <div>
            <img src="icons/no_video.png" />
            <NoVideoText style={{ color: "white" }}>방송 준비 시간입니다.</NoVideoText>
          </div>
        ) : (
          <YouTube
            videoId={currentVideoState.id}
            onReady={onReady}
            onPlay={onPlay}
            onPause={(e) => e.target.playVideo()}
          />
        )}
      </PlayerWrapper>
      <VideoTitle>{currentVideoState.title}</VideoTitle>
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
