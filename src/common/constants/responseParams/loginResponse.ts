import { Token } from "../dtos/token";
import { BaseRespone } from "./baseResponse";

export class LoginRespone extends BaseRespone {
    token:Token;
}