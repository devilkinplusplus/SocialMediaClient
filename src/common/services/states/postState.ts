import { atom } from "recoil";
import { Post } from "../../constants/dtos/post";

export const postState = atom<Post[] | null>({
  key: "postState",
  default: [],
});
