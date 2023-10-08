import scheduleData from "schedule/scheduleData";
import styled from "styled-components";
import { convertYoutubeUrlToId } from "utils";

export default function ScheduleTable() {
  return (
    <>
      <Table>
        {scheduleData.videos.map((video, i) => (
          <VideoInfo>
            <Thumbnail
              src={
                "https://img.youtube.com/vi/" + convertYoutubeUrlToId(video.url) + "/mqdefault.jpg"
              }
            />
            {scheduleData.startTime}
          </VideoInfo>
        ))}
      </Table>
    </>
  );
}

const Table = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  background-color: lightgray;
`;

const VideoInfo = styled.div`
  background-color: gray;
  padding: 20px;
  margin: 0 10px;
`;

const Thumbnail = styled.img`
  width: 200px;
`;
