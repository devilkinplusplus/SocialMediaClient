import { BaseRespone } from "./baseResponse";
import { Post } from '../dtos/post';

export class EditPostResponse extends BaseRespone{
    post:Post;
}