import { currentVideoState } from "atoms";
import { useRecoilValue } from "recoil";
import { loadScheduleToday } from "schedule";
import styled from "styled-components";
import { youtubeUrlToId } from "utils";

export default function OriginalVideos() {
  const currentVideo = useRecoilValue(currentVideoState);

  return (
    <>
      {currentVideo && (
        <Wrapper>
          <a href={currentVideo.url} target="_blank">
            <FullVideo>
              <h3>처음부터 보려면</h3>
              <img
                src={
                  "https://img.youtube.com/vi/" +
                  youtubeUrlToId(currentVideo.url) +
                  "/mqdefault.jpg"
                }
              />
            </FullVideo>
          </a>
          {currentVideo.summaryUrl && (
            <a href={currentVideo.summaryUrl} target="_blank">
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
            </a>
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
  margin: 0 10px;

  img {
    width: 100%;
  }
`;
