import { User } from "../dtos/user";
import { BaseRespone } from "./baseResponse";

export class UserResponse extends BaseRespone {
    value:User;
}