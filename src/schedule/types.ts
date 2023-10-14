export type Video = {
  url: string;
  from: string;
  to: string;
};

export type ScheduleData = {
  startTime: string;
  videos: Video[];
};

export interface RefinedSchedule extends ScheduleData {
  getCurrentVideo: () => RefinedVideo;
  videos: RefinedVideo[];
}

export interface RefinedVideo extends Video {
  duration: number;
  id: string;
  fromNum: number;
  toNum: number;
  startTime: string;
  endTime: string;
}
