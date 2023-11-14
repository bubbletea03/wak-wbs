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
            <div>
              {dateToString(video.startTimeDate).hm} ~ {dateToString(video.endTimeDate).hm}
              <VideoTitle>{video.title}</VideoTitle>
            </div>
          </VideoInfo>
        ))}
      </Table>
    </>
  );
}

const Table = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: repeat(auto-fill, minmax(100px, 1fr));
  justify-content: center;
  width: 100%;
  height: 100px;
  overflow: hidden;
  background-color: lightgreen;
`;

const VideoInfo = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-bottom: 20px;
  padding-right: 2px;
  padding-left: 2px;
  color: white;
  font-weight: bold;
  border: 2px solid white;
  background-color: rgba(0, 0, 0, 0.2);
`;

const VideoTitle = styled.div`
  color: black;
`;

const Thumbnail = styled.img`
  display: block;
  width: 100px;
  height: auto;
  margin-top: 10px;
`;
