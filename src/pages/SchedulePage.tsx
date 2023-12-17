import { loadScheduleToday } from "schedule";
import styled from "styled-components";
import { dateToString, getYoutubeThumbnailSrc } from "utils";

export default function SchedulePage() {
  const scheduleToday = loadScheduleToday();

  return (
    <>
      <HeaderBox>
        <TodayTitle>12월 22일</TodayTitle>
        <HeaderImg src="icons/bbangddeok.png" />
      </HeaderBox>

      {scheduleToday?.videos.map((video, index) => (
        <Wrapper key={index}>
          <InfoBox>
            {dateToString(video.startTimeDate).hm} <br />↓<br />
            {dateToString(video.endTimeDate).hm}
          </InfoBox>
          <Thumbnail src={getYoutubeThumbnailSrc(video.id)}></Thumbnail>
          <InfoBox>{video.title}</InfoBox>
        </Wrapper>
      ))}
    </>
  );
}

const InfoBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #65554b;
  color: white;
  text-align: center;
`;

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr auto 5fr;
  border: 3px solid rgba(101, 85, 75, 0.1);
  grid-gap: 10px;
  margin: 20px auto;
  width: 90%;
  height: 100px;
`;
const Thumbnail = styled.img`
  display: block;
  height: 100px;
`;

const HeaderBox = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 16 / 9;
`;

const HeaderImg = styled.img`
  width: 100%;
  height: 100%;
`;

const TodayTitle = styled.h2`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: white;
`;
