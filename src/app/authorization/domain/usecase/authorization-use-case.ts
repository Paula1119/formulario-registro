import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthorizationGateway } from '../gateway/authorization.gateway';
import { ICompany } from '../../../shared/interfaces/ICompany';
import { IResponse } from '../../../shared/interfaces/IResponse';

@Injectable({
  providedIn: 'root'
})
export default class AuthorizationUseCases {

  constructor( private _authorizationGateWay: AuthorizationGateway) { }

  register (data: ICompany): Observable <IResponse> {
    return this._authorizationGateWay.register(data);
  }

}