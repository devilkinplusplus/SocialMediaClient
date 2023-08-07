import { atom } from "recoil";
import { User } from "../../constants/dtos/user";
import { Post } from "../../constants/dtos/post";

export const userState = atom<User | null>({
  key: "userState",
  default: null,
});


