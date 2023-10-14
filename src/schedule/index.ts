import data from "./scheduleData.json";

const scheduleData: ScheduleData = data;

export const getSchedule = () => {
  const videos = scheduleData.videos;
  let sumDuration = 0;
  for (const video of videos) {
    const fromNum = mmssToSeconds(video.from);
    const toNum = mmssToSeconds(video.to);
    const duration = toNum - fromNum;

    const currentTime = new Date();
    currentTime.setSeconds(currentTime.getSeconds() + sumDuration);
    //ㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇ

    // 최초 시작 시각 갖고와서 이전까지의 duration (=sumDuration)을 더하면 됨
    const id = convertYoutubeUrlToId(video.url);

    sumDuration += duration;
  }

  /* 스케쥴 데이터 자체에 넣고싶은 것
    - 현재 비디오는 어디인지
    - duration
    - url to id
    그냥 RefinedSchedule은 코드 내에서 사용하는 거니까 굳이 string으로 놓지말까
    생각해보니까 시간표가 하루만 있는데. 날짜별로 시간표를 설정할 수 있게 해야되겠는데?
    
    - scheduleData 자체를 new Date()로 다 해버릴까 생각해봤는데 (애초에 저거를 뽑아낼 수 있는 웹페이지를 만드려고 했었으니까.)
       그걸로는 안 될듯 애초에 정적 데이터라. 그냥 하던대로하고 / 날짜 배열만 추가하는 식으로 해야할듯
  */
};

const convertYoutubeUrlToId = (youtubeUrl: string) => {
  const id = youtubeUrl.replace("https://www.youtube.com/watch?v=", "");

  return id;
};

// TODO getSchedule 이외에는 export 다 지우기
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

  console.log(id, time);
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

export const mmssToSeconds = (mmss: string) => {
  let [m, s] = mmss.split(":").map((v) => Number(v));
  return m * 60 + s;
};
