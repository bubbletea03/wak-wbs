import { atom } from "recoil";
import { DetailedVideo } from "schedule/types";

export const currentVideoState = atom<DetailedVideo | null | undefined>({
  key: "currentVideoState",
  default: null,
});

export const darkmodeState = atom<boolean>({
  key: "darkmodeState",
  default: false,
});
