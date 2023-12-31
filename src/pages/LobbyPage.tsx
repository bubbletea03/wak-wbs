import Player from "components/lobby/Player";
import ScheduleTable from "components/lobby/ScheduleTable";
import VideoRecommends from "components/lobby/VideoRecommends";
import { loadScheduleToday } from "schedule";
import styled from "styled-components";

export default function LobbyPage() {
  const scheduleToday = loadScheduleToday();

  return (
    <>
      <Logo src="icons/wbs_logo.png" />
      <DarkmodeButton>
        <img src={"icons/darkmode-btn/dark" + Math.floor(Math.random() * 6 + 1) + ".jpg"} />
      </DarkmodeButton>

      <Player />

      {scheduleToday ? (
        <>
          <ScheduleTable />
          <VideoRecommends />
        </>
      ) : (
        <>
          <div>오늘 방송 일정이 없습니다! 추천영상s:....</div>
        </>
      )}

      {/* <AllSchedule /> */}
    </>
  );
}

const Logo = styled.img`
  display: block;
  height: 70px;
  margin: 30px auto;
`;

const DarkmodeButton = styled.button`
  width: 70px;
  position: absolute;
  right: 20px;
  top: 30px;
  background-color: transparent;

  img {
    width: 100%;
    border-radius: 50%;
  }
`;
