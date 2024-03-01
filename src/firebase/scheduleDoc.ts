import { db } from "firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { Schedule } from "schedule/types";

export const setScheduleDoc = async (scheduleData: Schedule) => {
  await setDoc(doc(db, "schedule", "data"), scheduleData);
};

export const getScheduleDoc = async () => {
  const schedule = await getDoc(doc(db, "schedule", "data"));
};
