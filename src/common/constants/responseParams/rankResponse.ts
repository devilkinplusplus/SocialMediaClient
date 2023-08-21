import { BaseRespone } from "./baseResponse";
import { RankDto } from '../dtos/rankDto';

export class RankResponse extends BaseRespone {
    value:RankDto;
}