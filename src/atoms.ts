import { atom } from "recoil";

export const darkmodeState = atom<boolean>({
  key: "darkmodeState",
  default: false,
});
