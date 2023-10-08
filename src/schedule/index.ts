import { convertYoutubeUrlToId } from "utils";
import scheduleData from "./scheduleData";

export const getCurrentVideo = () => {
  let sumSeconds = 0;
  let id, time;
  for (const video of scheduleData.videos) {
    const from = mmssToSeconds(video.from);
    const to = mmssToSeconds(video.to);
    const duration = to - from;
    if (getElapsedSeconds() >= sumSeconds && getElapsedSeconds() <= duration) {
      id = convertYoutubeUrlToId(video.url);
      time = from + getElapsedSeconds() - sumSeconds;
      break;
    }
    sumSeconds += duration;
  }

  if (!id || !time) return null;

  return { id, time };
};

const getElapsedSeconds = () => {
  const startTimeDate = new Date();
  let [h, m] = scheduleData.startTime.split(":").map((v) => Number(v));
  startTimeDate.setHours(h, m, 0);

  const currentTimeDate = new Date();

  const elapsedTime = currentTimeDate.getTime() - startTimeDate.getTime();

  return elapsedTime / 1000;
};

const mmssToSeconds = (mmss: string) => {
  let [m, s] = mmss.split(":").map((v) => Number(v));
  return m * 60 + s;
};
