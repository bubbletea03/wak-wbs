import { useEffect, useState } from "react";
import YouTube, { YouTubeEvent, YouTubePlayer, YouTubeProps } from "react-youtube";
import { getScheduleToday } from "schedule";

export default function Player() {
  const [isPlaying, setIsPlaying] = useState(false);

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
      } else console.log("방송 준비 시간입니다;");
    }
  };

  const opts: YouTubeProps["opts"] = {
    height: "300",
    width: "1000",
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
    <YouTube
      videoId="2g811Eo7K8U"
      opts={opts}
      onReady={onReady}
      onPlay={onPlay}
      onPause={(e) => e.target.playVideo()}
    />
  );
}
