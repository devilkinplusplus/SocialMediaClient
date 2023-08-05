import { Token } from "../dtos/token";
import { BaseRespone } from "./baseResponse";

export class FacebookLoginResponse extends BaseRespone {
    token:Token;
}