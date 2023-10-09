import { mmssToSeconds } from "schedule";
import scheduleData from "schedule/scheduleData";
import styled from "styled-components";
import { convertYoutubeUrlToId } from "utils";

export default function ScheduleTable() {
  // TODO scheduleData 그냥 갖고오는 게 아니라 getScheduleData 이런 식으로 갖고오게 한다음 정제시키기...
  // 보일러 플레이트 너무 심함.
  const sumPreviousVideosDuration = (currIndex: number) => {
    let sumDuration = 0;
    for (let i = 0; i < currIndex; i++) {
      const from = mmssToSeconds(scheduleData.videos[i].from);
      const to = mmssToSeconds(scheduleData.videos[i].to);
      const duration = to - from;
      sumDuration += duration;
    }

    return sumDuration;
  };

  // 선 구현, 후 리팩
  const getVideoStartTime = (untilNowDuration: number) => {
    const startTimeDate = new Date();
    let [h, m] = scheduleData.startTime.split(":").map((v) => Number(v));
    startTimeDate.setHours(h, m, 0);

    startTimeDate.setTime(startTimeDate.getTime() + untilNowDuration * 1000);

    const hh = startTimeDate.getHours();
    const mm = startTimeDate.getMinutes().toString().padStart(2, "0");

    return `${hh}:${mm}`;
  };

  return (
    <>
      <Table>
        {scheduleData.videos.map((video, i) => (
          <VideoInfo>
            <Thumbnail
              src={
                "https://img.youtube.com/vi/" + convertYoutubeUrlToId(video.url) + "/mqdefault.jpg"
              }
            />
            시작 시간:
            {i === 0 ? scheduleData.startTime : getVideoStartTime(sumPreviousVideosDuration(i))}
          </VideoInfo>
        ))}
      </Table>
    </>
  );
}

const Table = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  background-color: lightgray;
`;

const VideoInfo = styled.div`
  background-color: gray;
  padding: 20px;
  margin: 0 10px;
`;

const Thumbnail = styled.img`
  display: block;
  width: 200px;
`;
