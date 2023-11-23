import Player from "./components/Player";
import ScheduleTable from "components/ScheduleTable";
import styled from "styled-components";
import VideoRecommends from "components/VideoRecommends";
import { loadScheduleToday } from "schedule";

function App() {
  /* TODO 스케쥴 잘못 입력하는 경우 예외처리 (방송 준비중 화면 띄우기)
    - from 혹은 to가 해당 비디오의 duration을 아예 넘었을 경우
    - 첫영상 기준 시각보다 일찍이거나, 영상 상영이 다 끝난 타이밍의 경우
  */
  const scheduleToday = loadScheduleToday();

  return (
    <div className="App">
      <header className="App-header">
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
      </header>
      <Footer>Icons by Icons8</Footer>
    </div>
  );
}

export default App;

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

const Footer = styled.footer`
  position: absolute;
  bottom: 5px;
  width: 100%;
  text-align: center;
  font-size: 7px;
  color: gray;
`;
