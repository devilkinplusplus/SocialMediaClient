import { Post } from "../dtos/post";
import { BaseRespone } from "./baseResponse";

export class PostResponse extends BaseRespone {
    value:Post;
}