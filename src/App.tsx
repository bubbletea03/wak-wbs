import styled, { ThemeProvider } from "styled-components";
import { Route, Routes } from "react-router-dom";
import LobbyPage from "pages/LobbyPage";
import SchedulePage from "pages/SchedulePage";
import AdminPage from "pages/AdminPage";
import { darkTheme, lightTheme } from "themes";

export default function App() {
  /* TODO 스케쥴 잘못 입력하는 경우 예외처리 (방송 준비중 화면 띄우기)
    - from 혹은 to가 해당 비디오의 duration을 아예 넘었을 경우
    - 첫영상 기준 시각보다 일찍이거나, 영상 상영이 다 끝난 타이밍의 경우
  */

  return (
    <>
      <ThemeProvider theme={lightTheme}>
        <Body>
          <Routes>
            <Route path="/" element={<LobbyPage />} />
            <Route path="/schedule" element={<SchedulePage />} />
            <Route path="/admin" element={<AdminPage />} />
          </Routes>
        </Body>
      </ThemeProvider>

      <Footer>Icons by Icons8</Footer>
    </>
  );
}

const Body = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: ${(props) => props.theme.colors && props.theme.colors.bg};
`;

const Footer = styled.footer`
  position: absolute;
  bottom: 0;
  width: 100%;
  text-align: center;
  font-size: 7px;
  color: gray;
`;
