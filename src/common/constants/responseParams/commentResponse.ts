import { Comment } from "../dtos/comment";
import { BaseRespone } from "./baseResponse";

export class CommentResponse extends BaseRespone{
    comment:Comment
}