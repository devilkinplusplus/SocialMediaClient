import { atom } from "recoil";
import { User } from "../../constants/dtos/user";
import { Following } from "../../constants/dtos/following";

export const userState = atom<User | null>({
  key: "userState",
  default: null,
});


export const followerState = atom<Following[] | null>({
  key: "followerState",
  default: null,
});

export const followingState = atom<Following[] | null>({
  key: "followingState",
  default: null,
});