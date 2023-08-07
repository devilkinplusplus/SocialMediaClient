import { Post } from "../dtos/post";
import { BaseRespone } from "./baseResponse";

export class CreatePostResponse extends BaseRespone {
    post:Post;
}