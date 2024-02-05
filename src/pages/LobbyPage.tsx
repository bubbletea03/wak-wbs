import { darkmodeState } from "atoms";
import Player from "components/lobby/Player";
import ScheduleTable from "components/lobby/ScheduleTable";
import OriginalVideos from "components/lobby/OriginalVideos";
import { useSetRecoilState } from "recoil";
import { loadScheduleToday } from "schedule";
import styled from "styled-components";
import RecommendVideos from "components/lobby/RecommendVideos";
import CurrentVideoCycle from "components/lobby/CurrentVideoCycle";

export default function LobbyPage() {
  const scheduleToday = loadScheduleToday();

  const setDarkmodeState = useSetRecoilState(darkmodeState);

  const handleDarkmodeButton = () => {
    setDarkmodeState((prev) => !prev);
  };

  return (
    <>
      <CurrentVideoCycle />
      <Logo src="icons/wbs_logo.png" />
      <ButtonWrapper>
        <DarkmodeButton onClick={handleDarkmodeButton}>
          <img src={"icons/darkmode-btn/dark" + Math.floor(Math.random() * 6 + 1) + ".jpg"} />
        </DarkmodeButton>
      </ButtonWrapper>

      <Player />

      <LowerSection>
        {scheduleToday ? (
          <>
            <ScheduleTable />
            <OriginalVideos />
          </>
        ) : (
          <>
            <div>오늘 방송 일정이 없습니다! 추천영상s:....</div>
            <RecommendVideos />
          </>
        )}
      </LowerSection>

      {/* <AllSchedule /> */}
    </>
  );
}

const LowerSection = styled.div`
  margin: 0 auto;
  max-width: 650px;
`;

const Logo = styled.img`
  display: block;
  height: 70px;
  margin: 30px auto;
  ${(props) =>
    props.theme.name === "dark" &&
    `filter: invert(41%) sepia(98%) saturate(360%) hue-rotate(83deg) brightness(89%) contrast(81%);`}
`;

const ButtonWrapper = styled.div`
  position: absolute;
  right: 20px;
  top: 30px;
  width: 60px;
  height: 60px;
  padding: 10px;
  border-radius: 50%;

  transition: background-color 0.3s;
  &:hover {
    background-color: rgba(0, 0, 0, 0.1);
  }
`;

const DarkmodeButton = styled.button`
  width: 100%;
  height: 100%;
  background-color: transparent;

  img {
    width: 100%;
    border-radius: 50%;
  }

  transition: filter 0.2s;
  &:hover {
    filter: brightness(0.8);
  }
`;
