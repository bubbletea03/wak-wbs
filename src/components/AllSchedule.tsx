import { useState } from "react";
import { loadScheduleToday } from "schedule";
import styled from "styled-components";
import { dateToString } from "utils";

export default function AllSchedule() {
  const [isModalActive, setIsModalActive] = useState(false);
  const scheduleToday = loadScheduleToday();

  return (
    <>
      <ModalOpenButton onClick={() => setIsModalActive(true)}>시간표</ModalOpenButton>
      {isModalActive && (
        <>
          <ModalBackground onClick={() => setIsModalActive(false)} />
          <ModalWrapper>
            <Today>{scheduleToday?.date} 편성표</Today>
            {scheduleToday?.videos.map((video, index) => (
              <div key={index}>
                {dateToString(video.startTimeDate).hm} ~ {dateToString(video.endTimeDate).hm}{" "}
                {video.title}
              </div>
            ))}
          </ModalWrapper>
        </>
      )}
    </>
  );
}

const Today = styled.h3`
  display: block;
  width: fit-content;
  margin: 20px auto;
`;

const ModalWrapper = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 300px;
  height: 500px;

  padding: 30px;

  background-color: white;
`;

const ModalBackground = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  background-color: black;
  opacity: 0.5;
`;

const ModalOpenButton = styled.button`
  position: fixed;
  background-color: green;
  top: 400px;
  right: 0;
`;
