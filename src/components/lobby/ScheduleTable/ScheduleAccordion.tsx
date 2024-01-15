import { loadScheduleToday } from "schedule";
import styled from "styled-components";
import { dateToString, getYtThumbnailSrc } from "utils";

export default function ScheduleAccordion() {
  const scheduleToday = loadScheduleToday();

  return (
    <>
      {scheduleToday?.videos.map((video, index) => (
        <Wrapper key={index}>
          <InfoBox>
            {dateToString(video.startTimeDate).hm} <br />↓<br />
            {dateToString(video.endTimeDate).hm}
          </InfoBox>
          <Thumbnail>
            <img src={getYtThumbnailSrc(video.id)} />
            <Tail />
          </Thumbnail>
          <InfoBox>{video.title}</InfoBox>
        </Wrapper>
      ))}
    </>
  );
}

const Tail = styled.div`
  background-color: #2a1305;
  margin-left: 3px;
  width: 5px;
  height: 100px;
`;

const Thumbnail = styled.div`
  display: flex;

  img {
    background-color: #2a1305;
    padding: 5px;
    height: 90px;
  }
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

const InfoBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #65554b;
  color: white;
  text-align: center;
  border-radius: 10px;
`;
