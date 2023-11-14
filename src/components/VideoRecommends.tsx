import { loadScheduleToday } from "schedule";
import styled from "styled-components";

export default function VideoRecommends() {
  const scheduleToday = loadScheduleToday();

  return (
    <>
      <Wrapper>
        <FullVideo>
          <h3>처음부터 보려면</h3>
          <img
            src={"https://img.youtube.com/vi/" + scheduleToday?.videos[0].id + "/mqdefault.jpg"}
          />
        </FullVideo>
        <SummaryVideo>
          <h3>액기스로 보려면 </h3>
          <img
            src={"https://img.youtube.com/vi/" + scheduleToday?.videos[0].id + "/mqdefault.jpg"}
          />
        </SummaryVideo>
      </Wrapper>
    </>
  );
}

const FullVideo = styled.div`
  display: block;
  h3 {
    font-weight: 500;
    margin: 10px 10x;
  }
`;

const SummaryVideo = styled.div`
  display: block;
  h3 {
    font-weight: 500;
    margin: 10px 10x;
  }
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: space-around;
`;
