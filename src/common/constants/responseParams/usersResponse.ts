import { User } from "../dtos/user";
import { BaseRespone } from "./baseResponse";

export class UsersReponse extends BaseRespone {
    userCount:number;
    values:User[];
}