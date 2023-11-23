import { loadScheduleToday } from "schedule";
import styled from "styled-components";
import { dateToString } from "utils";

export default function ScheduleTable() {
  const scheduleToday = loadScheduleToday();

  // 스택 사용하여 좌우 이동 구현

  return (
    <>
      <Table>
        <ArrowIcon src="icons/green_rightarrow.png" isLeftArrow />
        <ArrowIcon src="icons/green_rightarrow.png" />
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

const ArrowIcon = styled.img<{ isLeftArrow?: boolean }>`
  position: absolute;
  opacity: 0.8;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  ${(props) => props.isLeftArrow && `transform: translateY(-50%) scaleX(-1); left: 0;`}
  width: 50px;
  height: auto;
`;

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
  position: relative;
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 100px;
  background-color: lightgreen;
`;

const VideoInfo = styled.div<{ isCurrentVideo: boolean }>`
  display: flex;
  width: 100%;
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
