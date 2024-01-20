import { currentVideoState } from "atoms";
import useInterval from "hooks/useInterval";
import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { loadScheduleToday } from "schedule";

export default function CurrentVideoCycle() {
  const scheduleToday = loadScheduleToday();
  const [currentVideo, setCurrentVideoState] = useRecoilState(currentVideoState);

  const updateCurrentVideo = () => {
    const latestCurrentVideo = scheduleToday?.getCurrentVideo();
    if (latestCurrentVideo?.id !== currentVideo?.id) {
      setCurrentVideoState(latestCurrentVideo);
    }
  };

  useInterval(updateCurrentVideo, 1000);

  useEffect(() => {
    setCurrentVideoState(scheduleToday?.getCurrentVideo());
  }, []);

  return <></>;
}
