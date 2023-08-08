import { Post } from "../dtos/post";
import { BaseRespone } from "./baseResponse";

export class PostListResponse extends BaseRespone {
    values:Post[];
    postCount:number;
}