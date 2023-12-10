import styled from "styled-components";

export default function SchedulePage() {
  return (
    <>
      <HeaderBox>
        <TodayTitle>12월 22일</TodayTitle>
        <HeaderImg src="icons/bbangddeok.png" />
      </HeaderBox>
    </>
  );
}

const HeaderBox = styled.div`
  position: relative;
  width: 100%;
  height: 20vh;
`;

const HeaderImg = styled.img`
  width: 100%;
  height: 100%;
`;

const TodayTitle = styled.h2`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: white;
`;
