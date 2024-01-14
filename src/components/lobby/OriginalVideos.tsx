import { loadScheduleToday } from "schedule";
import styled from "styled-components";
import { youtubeUrlToId } from "utils";

export default function OriginalVideos() {
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
    margin-left: 10px;
    margin-bottom: 5px;
  }
`;

const SummaryVideo = styled.div`
  display: block;
  h3 {
    font-weight: 500;
    margin-left: 10px;
    margin-bottom: 5px;
  }
`;

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-column-gap: 10px;

  img {
    width: 100%;
  }
`;
