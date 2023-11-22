import { loadScheduleToday } from "schedule";
import styled from "styled-components";
import { dateToString } from "utils";

export default function ScheduleTable() {
  const scheduleToday = loadScheduleToday();

  // 스택 사용하여 좌우 이동 구현

  return (
    <>
      <Table>
        {scheduleToday?.videos.map((video, i) => {
          const currentVideo = scheduleToday?.getCurrentVideo();
          let isCurrentVideo = false;

          if (video === currentVideo) isCurrentVideo = true;

          return (
            <VideoInfo isCurrentVideo={isCurrentVideo}>
              <Thumbnail src={"https://img.youtube.com/vi/" + video.id + "/mqdefault.jpg"} />
              <div>
                {dateToString(video.startTimeDate).hm} ~ {dateToString(video.endTimeDate).hm}
                <VideoTitle>{video.title}</VideoTitle>
              </div>
            </VideoInfo>
          );
        })}
      </Table>
      <AllScheduleButton>전체 시간표 보기</AllScheduleButton>
    </>
  );
}

const AllScheduleButton = styled.button`
  display: block;
  background-color: lightgreen;
  width: 50%;
  height: fit-content;
  font-size: 1rem;
  margin: 0 auto;
  border: none;
  color: white;
  font-weight: bold;
`;

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

const VideoInfo = styled.div<{ isCurrentVideo: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-bottom: 20px;
  padding-right: 2px;
  padding-left: 2px;
  color: white;
  font-weight: bold;
  border: 2px solid white;
  background-color: ${(props) =>
    props.isCurrentVideo ? "rgba(0, 0, 0, 0.4)" : "rgba(0, 0, 0, 0.2)"};
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
