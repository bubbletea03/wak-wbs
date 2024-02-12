import useInterval from "hooks/useInterval";
import { useEffect, useState } from "react";
import { loadScheduleToday } from "schedule";
import { DetailedVideo } from "schedule/types";
import styled from "styled-components";
import { keyframes } from "styled-components";
import { dateToString, getYtThumbnailSrc } from "utils";

export default function ScheduleAccordion() {
  const scheduleToday = loadScheduleToday();
  const [representedCount, setRepresentedCount] = useState(0);

  function sleep(delay: number) {
    return new Promise((resolve) => setTimeout(resolve, delay));
  }

  const increaseRepresentedCount = async () => {
    for (let v in scheduleToday?.videos) {
      await sleep(100);
      setRepresentedCount((prev) => prev + 1);
    }
  };

  useEffect(() => {
    increaseRepresentedCount();
  }, []);

  return (
    <>
      <BlindLowerSection>
        {scheduleToday?.videos.slice(0, representedCount + 1).map((video, index) => (
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
      </BlindLowerSection>
    </>
  );
}

const BlindLowerSection = styled.div`
  position: absolute;
  background-color: ${(props) => props.theme.colors.bg};
  width: 100%;
  height: 100%;
  z-index: 1;
`;

const Tail = styled.div`
  background-color: #2a1305;
  margin-left: 3px;
  width: 6px;
  height: 100%;
  border-radius: 10px;
`;

const Thumbnail = styled.div`
  display: flex;

  img {
    background-color: #2a1305;
    padding: 7px;
    height: 90px;
    border-radius: 10px;
  }
`;

const fadeAndRiseAnime = keyframes`
  0% {
    opacity: 0;
    transform: translate(0, 100px);
  }
  100% {
    opacity: 1;
    transform: translate(0, 0);
  }
`;

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr auto 5fr;
  grid-gap: 10px;
  margin: 12px auto;
  width: 90%;
  height: 100px;
  animation: ${fadeAndRiseAnime} 0.6s ease-out;
`;

const InfoBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #2a1305;
  color: white;
  text-align: center;
  border-radius: 10px;
  padding: 0 10px;
`;
