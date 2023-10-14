type Video = {
  url: string;
  from: string;
  to: string;
};

type ScheduleData = {
  startTime: string;
  videos: Video[];
};

interface RefinedSchedule extends ScheduleData {
  getCurrentVideo: () => RefinedVideo;
  videos: RefinedVideo[];
}

interface RefinedVideo extends Video {
  duration: number;
  id: string;
  fromNum: number;
  toNum: number;
  startTime: string;
  endTime: string;
}
