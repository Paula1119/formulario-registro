import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class BaseApiService {

  private url = environment.apiUrl;
  private apiUrlParams = environment.apiUrlParams;

  constructor(private readonly http: HttpClient) { }

  get(path: string, headers: HttpHeaders) {
    return this.http.get(`${this.url}${path}`, { headers: headers } );
  }

  post(path: string, data: any, headers: HttpHeaders) {
    return this.http.post(`${this.url}${path}`, data,  { headers: headers } );
  }

  put(path: string, data: any) {
    return this.http.put(`${this.url}${path}${this.apiUrlParams}`, data);
  }

  delete(path: string,) {
    return this.http.delete(`${this.url}${path}${this.apiUrlParams}`);
  }

}
