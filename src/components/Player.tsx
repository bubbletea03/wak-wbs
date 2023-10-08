import { useEffect, useState } from "react";
import YouTube, { YouTubeEvent, YouTubePlayer, YouTubeProps } from "react-youtube";
import schedule, { convertUrlToId } from "../schedule";

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
      findWhereShouldIAm();
    }
  };

  const opts: YouTubeProps["opts"] = {
    height: "300",
    width: "1000",
    playerVars: {
      // controls: 0,
    },
  };

  const getElapsedSeconds = () => {
    const startTimeDate = new Date();
    let [h, m] = schedule.startTime.split(":").map((v) => Number(v));
    startTimeDate.setHours(h, m, 0);

    const currentTimeDate = new Date();

    const elapsedTime = currentTimeDate.getTime() - startTimeDate.getTime();

    return elapsedTime / 1000;
  };

  const mmssToSeconds = (mmss: string) => {
    let [m, s] = mmss.split(":").map((v) => Number(v));
    return m * 60 + s;
  };

  // 어느 비디오의 어느 초에 있어야되는지 찾기
  const findWhereShouldIAm = () => {
    let sumSeconds = 0;
    for (const video of schedule.videos) {
      console.log("loop");
      const from = mmssToSeconds(video.from);
      const to = mmssToSeconds(video.to);
      const duration = to - from;
      if (getElapsedSeconds() >= sumSeconds && getElapsedSeconds() <= duration) {
        setCurrentVideoId(convertUrlToId(video.url));
        setCurrentVideoTime(from + getElapsedSeconds() - sumSeconds);
        console.log(video, "in");
        break;
      }
      sumSeconds += duration;
    }
  };

  useEffect(() => {
    if (isPlaying) {
      console.log("work useEffect!");
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
