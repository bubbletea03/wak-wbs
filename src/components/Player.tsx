import { useEffect, useState } from "react";
import YouTube, { YouTubeEvent, YouTubePlayer, YouTubeProps } from "react-youtube";
import { getCurrentVideo } from "schedule";

export default function Player() {
  const [isPlaying, setIsPlaying] = useState(false);

  const [currentVideoId, setCurrentVideoId] = useState("lM-G5ScFOEw");
  const [currentVideoTime, setCurrentVideoTime] = useState(0);
  const [player, setPlayer] = useState<YouTubePlayer>();

  const onReady = (e: YouTubeEvent) => {};

  const onPlay = (e: YouTubeEvent) => {
    if (!isPlaying) {
      setIsPlaying(true);
      setPlayer(e.target);
      const currentVideo = getCurrentVideo();
      if (currentVideo) {
        setCurrentVideoId(currentVideo.id);
        setCurrentVideoTime(currentVideo.time);
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
