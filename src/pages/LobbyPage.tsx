import { darkmodeState } from "atoms";
import Player from "components/lobby/Player";
import ScheduleTable from "components/lobby/ScheduleTable";
import VideoRecommends from "components/lobby/VideoRecommends";
import { useSetRecoilState } from "recoil";
import { loadScheduleToday } from "schedule";
import styled from "styled-components";

export default function LobbyPage() {
  const scheduleToday = loadScheduleToday();

  const setDarkmodeState = useSetRecoilState(darkmodeState);

  const handleDarkmodeButton = () => {
    setDarkmodeState((prev) => !prev);
  };

  return (
    <>
      <Logo src="icons/wbs_logo.png" />
      <DarkmodeButton onClick={handleDarkmodeButton}>
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
  ${(props) =>
    props.theme.name === "dark" &&
    `filter: invert(41%) sepia(98%) saturate(360%) hue-rotate(83deg) brightness(89%) contrast(81%);`}
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
