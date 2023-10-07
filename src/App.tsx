import React, { useEffect, useRef, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import Youtube, { YouTubeEvent, YouTubePlayer, YouTubeProps } from "react-youtube";
import schedule, { convertUrlToId } from "./schedule";

function App() {
  const refTest = useRef<HTMLDivElement>(null);

  const onReady = (e: YouTubeEvent) => {};

  const [isPlaying, setIsPlaying] = useState(false);

  const [currentVideoId, setCurrentVideoId] = useState("lM-G5ScFOEw");
  const [currentVideoTime, setCurrentVideoTime] = useState(0);
  const [player, setPlayer] = useState<YouTubePlayer>();

  /* TODO 스케쥴 잘못 입력하는 경우 예외처리 (방송 준비중 화면 띄우기)
    - from 혹은 to가 해당 비디오의 duration을 아예 넘었을 경우
    - 첫영상 기준 시각보다 일찍이거나, 영상 상영이 다 끝난 타이밍의 경우
  */

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

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer">
          Learn React
        </a>

        <div ref={refTest}>
          <Youtube
            videoId="2g811Eo7K8U"
            opts={opts}
            onReady={onReady}
            onPlay={onPlay}
            onPause={(e) => e.target.playVideo()}
          />
        </div>
      </header>
    </div>
  );
}

export default App;
