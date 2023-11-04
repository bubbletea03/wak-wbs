import scheduleListData from "./scheduleListData.json";
import { DetailedSchedule, DetailedVideo, Schedule, ScheduleList } from "./types";

const scheduleList: ScheduleList = scheduleListData;

export const loadScheduleToday = () => {
  const scheduleToday = filterTodaySchedule();

  if (!scheduleToday) return null;

  const videos = scheduleToday.videos;
  let sumDuration = 0;
  const detailedVideos: DetailedVideo[] = [];

  for (const video of videos) {
    const fromNum = mmssToSeconds(video.from);
    const toNum = mmssToSeconds(video.to);
    const duration = toNum - fromNum;
    const id = convertYoutubeUrlToId(video.url);

    const firstStartTimeDate = getFirstStartTimeDate(scheduleToday);

    const startTimeDate = new Date(firstStartTimeDate);
    startTimeDate.setSeconds(startTimeDate.getSeconds() + sumDuration);

    const endTimeDate = new Date(startTimeDate);
    endTimeDate.setSeconds(endTimeDate.getSeconds() + duration);

    const detailedVideo: DetailedVideo = {
      ...video,
      duration,
      fromNum,
      toNum,
      startTimeDate,
      endTimeDate,
      id,
    };
    detailedVideos.push(detailedVideo);

    const currentDate = new Date();
    if (currentDate >= startTimeDate && currentDate <= endTimeDate) {
    }

    sumDuration += duration;
  }

  const detailedScheduleToday: DetailedSchedule = {
    ...scheduleToday,
    getCurrentVideo: () => getCurrentVideo(detailedVideos),
    videos: detailedVideos,
  };

  return detailedScheduleToday;
};

const getCurrentVideo = (videos: DetailedVideo[]) => {
  const currentDate = new Date();
  for (const video of videos) {
    if (currentDate >= video.startTimeDate && currentDate <= video.endTimeDate) return video;
  }

  return null;
};

const getFirstStartTimeDate = (schedule: Schedule) => {
  const firstStartTimeDate = new Date();
  const [h, m] = schedule.firstStartTime.split(":").map((v) => Number(v));
  firstStartTimeDate.setHours(h, m, 0);

  return firstStartTimeDate;
};

const filterTodaySchedule = () => {
  const today = new Date();
  const scheduleToday = scheduleList.filter((daySchedule) => {
    const [m, d] = daySchedule.date.split("/").map((v) => Number(v));

    return m === today.getMonth() + 1 && d === today.getDate();
  })[0];

  return scheduleToday;
};

const convertYoutubeUrlToId = (youtubeUrl: string) => {
  const id = youtubeUrl.replace("https://www.youtube.com/watch?v=", "");

  return id;
};

const mmssToSeconds = (mmss: string) => {
  let [m, s] = mmss.split(":").map((v) => Number(v));
  return m * 60 + s;
};
