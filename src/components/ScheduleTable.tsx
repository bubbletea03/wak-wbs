import { loadScheduleToday } from "schedule";
import styled from "styled-components";
import { dateToString } from "utils";

export default function ScheduleTable() {
  const scheduleToday = loadScheduleToday();

  return (
    <>
      <Table>
        {scheduleToday?.videos.map((video, i) => (
          <VideoInfo>
            <Thumbnail src={"https://img.youtube.com/vi/" + video.id + "/mqdefault.jpg"} />
            {dateToString(video.startTimeDate).hm} ~ {dateToString(video.endTimeDate).hm}
            <VideoTitle>{video.title}</VideoTitle>
          </VideoInfo>
        ))}
      </Table>
    </>
  );
}

const Table = styled.div`
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  width: 100%;
  height: 170px;
  overflow: hidden;
  background-color: lightgreen;
`;

const VideoInfo = styled.div`
  display: inline-block;
  padding-bottom: 20px;
  color: white;
  font-weight: bold;
  margin: 0 10px;
`;

const VideoTitle = styled.div`
  color: black;
`;

const Thumbnail = styled.img`
  display: block;
  width: 200px;
`;
