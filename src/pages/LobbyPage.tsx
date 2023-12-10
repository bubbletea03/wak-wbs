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
        <img src="icons/moon.png" width={20} />
        다크 모드로 변경
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
  display: flex;
  align-items: center;
  position: absolute;
  right: 20px;
  top: 30px;
  padding: 5px;
  background-color: transparent;
  border: 1px solid rgba(0, 0, 0, 0.7);
  border-radius: 30px;
`;
