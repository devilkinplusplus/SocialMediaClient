import { Suggested } from "../dtos/suggested";
import { BaseRespone } from "./baseResponse";

export class SuggestedReponse extends BaseRespone {
    values:Suggested[];
    userCount:number;
}