import logo from "./logo.svg";
import "./App.css";
import Player from "./components/Player";
import ScheduleTable from "components/ScheduleTable";

function App() {
  /* TODO 스케쥴 잘못 입력하는 경우 예외처리 (방송 준비중 화면 띄우기)
    - from 혹은 to가 해당 비디오의 duration을 아예 넘었을 경우
    - 첫영상 기준 시각보다 일찍이거나, 영상 상영이 다 끝난 타이밍의 경우
  */

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer">
          Learn React
        </a>

        <Player />
        <ScheduleTable />
      </header>
    </div>
  );
}

export default App;
