import { FollowState } from "../dtos/followState";
import { BaseRespone } from "./baseResponse";

export class FollowResponse extends BaseRespone {
    followState:FollowState;
}