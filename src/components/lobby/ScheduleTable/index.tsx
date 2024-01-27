import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loadScheduleToday } from "schedule";
import styled from "styled-components";
import { dateToString, getYtThumbnailSrc } from "utils";
import ScheduleAccordion from "./ScheduleAccordion";
import { useRecoilValue } from "recoil";
import { currentVideoState } from "atoms";

export default function ScheduleTable() {
  const navigate = useNavigate();
  const ITEM_COUNT_EACH_TABLE = 3;

  const currentVideo = useRecoilValue(currentVideoState);
  const scheduleToday = loadScheduleToday();
  const [tableShiftCount, setTableShiftCount] = useState(0);
  const [isActiveScheduleAccordion, setIsActiveScheduleAccordion] = useState(false);

  if (!scheduleToday) return <></>;

  return (
    <>
      <Table>
        {tableShiftCount > 0 && (
          <ArrowIcon
            onClick={() => setTableShiftCount((prev) => prev - 1)}
            src="icons/green_rightarrow.png"
            isLeftArrow
          />
        )}
        {tableShiftCount + ITEM_COUNT_EACH_TABLE < scheduleToday.videos.length && (
          <ArrowIcon
            onClick={() => setTableShiftCount((prev) => prev + 1)}
            src="icons/green_rightarrow.png"
          />
        )}

        {scheduleToday.videos
          .slice(tableShiftCount, tableShiftCount + ITEM_COUNT_EACH_TABLE)
          .map((video, i) => {
            let isCurrentVideo = false;

            if (video.id === currentVideo?.id) isCurrentVideo = true;

            return (
              <VideoInfo isCurrentVideo={isCurrentVideo}>
                <Thumbnail src={getYtThumbnailSrc(video.id)} />
                <div>
                  {dateToString(video.startTimeDate).hm} ~ {dateToString(video.endTimeDate).hm}
                  <VideoTitle>{video.title}</VideoTitle>
                </div>
              </VideoInfo>
            );
          })}
      </Table>

      <AllScheduleButton onClick={() => setIsActiveScheduleAccordion((prev) => !prev)}>
        전체 시간표 보기
      </AllScheduleButton>
      {isActiveScheduleAccordion && <ScheduleAccordion />}
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
  cursor: pointer;
`;

const AllScheduleButton = styled.button`
  display: block;
  background-color: lightgreen;
  width: 50%;
  height: fit-content;
  font-size: 1rem;
  margin: 4px auto;
  border: none;
  color: white;
  font-weight: bold;

  transition:
    box-shadow,
    filter 0.2s;
  &:hover {
    filter: brightness(0.9);
    box-shadow:
      rgba(0, 0, 0, 0.1) 0px 3px 6px,
      rgba(0, 0, 0, 0.18) 0px 3px 6px;
  }
`;

const Table = styled.div`
  position: relative;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-column-gap: 3px;
  width: 100%;
  height: fit-content;
`;

const VideoInfo = styled.div<{ isCurrentVideo: boolean }>`
  display: flex;
  width: 100%;
  max-height: 100px;
  justify-content: center;
  align-items: center;
  padding-bottom: 20px;
  color: white;
  font-weight: bold;
  background-color: ${(props) => (props.isCurrentVideo ? "#499b49" : "lightgreen")};
`;

const VideoTitle = styled.div`
  color: black;
`;

const Thumbnail = styled.img`
  display: block;
  width: 50%;
  margin-top: 10px;
`;
