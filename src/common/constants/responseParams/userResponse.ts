import { User } from "../dtos/user";

export class UserResponse {
    succeeded:boolean;
    value:User;
    errors:string[]
}