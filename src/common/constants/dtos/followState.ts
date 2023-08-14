import { Following } from "./following";

export class FollowState {
    hasRequest:boolean;
    isFollowing:boolean;
    isUnfollowed:boolean;
    following:Following;
    follower:Following;
}