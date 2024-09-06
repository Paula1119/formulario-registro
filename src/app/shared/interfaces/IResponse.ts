import { EResult } from "../enums/EResult";

export interface IResponse {
    result: EResult;
    message: string;
}