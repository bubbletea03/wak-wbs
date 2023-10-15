export type Video = {
  url: string;
  from: string;
  to: string;
};

export type Schedule = {
  date: string;
  firstStartTime: string;
  videos: Video[];
};

export type ScheduleList = Schedule[];

export interface DetailedSchedule extends Schedule {
  getCurrentVideo: () => DetailedVideo | null;
  videos: DetailedVideo[];
}

export interface DetailedVideo extends Video {
  duration: number;
  id: string;
  fromNum: number;
  toNum: number;
  startTimeDate: Date;
  endTimeDate: Date;
}
