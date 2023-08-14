import { Following } from "../dtos/following";
import { BaseRespone } from "./baseResponse";

export class FollowerResponse extends BaseRespone {
   value:FollowingDto;
}

export class FollowingDto {
    followingCount:number;
    followings:Following[];
}