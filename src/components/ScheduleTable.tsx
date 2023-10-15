import { getScheduleToday } from "schedule";
import styled from "styled-components";

export default function ScheduleTable() {
  const scheduleToday = getScheduleToday();

  return (
    <>
      <Table>
        {scheduleToday?.videos.map((video, i) => (
          <VideoInfo>
            <Thumbnail src={"https://img.youtube.com/vi/" + video.id + "/mqdefault.jpg"} />
            시작 시간:
            {video.startTimeDate.getHours()} :{" "}
            {video.startTimeDate.getMinutes().toString().padStart(2, "0")}
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
