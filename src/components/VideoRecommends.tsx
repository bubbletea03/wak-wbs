import { loadScheduleToday } from "schedule";
import styled from "styled-components";

export default function VideoRecommends() {
  const scheduleToday = loadScheduleToday();

  return (
    <>
      <Wrapper>
        <FullVideo>
          처음부터 보려면
          <img
            src={"https://img.youtube.com/vi/" + scheduleToday?.videos[0].id + "/mqdefault.jpg"}
          />
        </FullVideo>
        <SummaryVideo>
          액기스로 보려면
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
`;

const SummaryVideo = styled.div`
  display: block;
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: space-around;
`;
