import { Token } from "../dtos/token";
import { BaseRespone } from "./baseResponse";

export class GoogleLoginResponse extends BaseRespone {
    token:Token;
}