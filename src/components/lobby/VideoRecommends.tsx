import { loadScheduleToday } from "schedule";
import styled from "styled-components";
import { youtubeUrlToId } from "utils";

export default function VideoRecommends() {
  const scheduleToday = loadScheduleToday();
  const currentVideo = scheduleToday?.getCurrentVideo();

  return (
    <>
      {currentVideo && (
        <Wrapper>
          <FullVideo>
            <h3>처음부터 보려면</h3>
            <img
              src={
                "https://img.youtube.com/vi/" + youtubeUrlToId(currentVideo.url) + "/mqdefault.jpg"
              }
            />
          </FullVideo>
          {currentVideo.summaryUrl && (
            <SummaryVideo>
              <h3>액기스로 보려면 </h3>
              <img
                src={
                  "https://img.youtube.com/vi/" +
                  youtubeUrlToId(currentVideo.summaryUrl) +
                  "/mqdefault.jpg"
                }
              />
            </SummaryVideo>
          )}
        </Wrapper>
      )}
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
