import { Observable } from "rxjs";
import { ICompany } from "../../../shared/interfaces/ICompany";
import { IResponse } from "../../../shared/interfaces/IResponse";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export abstract class AuthorizationGateway {

    abstract register(data: ICompany): Observable<IResponse>;

}