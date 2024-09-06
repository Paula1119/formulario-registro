import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { ICompany } from '../../../shared/interfaces/ICompany';
import { BaseApiService } from '../base-api-service/base-api.service';
import { IResponse } from '../../../shared/interfaces/IResponse';
import { AuthorizationGateway } from '../../domain/gateway/authorization.gateway';

@Injectable()
export class AuthorizationApiService extends AuthorizationGateway {

  constructor(private http: BaseApiService, private https: HttpClient) { super(); }

  register(data: ICompany): Observable<IResponse>{
    const headers = new HttpHeaders();
    return this.http.post('Register', data, headers).pipe(
      map(response => {
        return response as IResponse
      })
    )
  }
}