import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { environment } from "./../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ApiRequestService {

  baseUrl:any = environment.baseUrl;

  constructor(private http: HttpClient) { }

  getToken() {
    return "";
  }

  get(uri: string) {
    return this.http.get(`${this.baseUrl}/${uri}`, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'auth': this.getToken()
      })
    }
    )
  }

  post(uri: string, payload: Object) {
    this.getToken()
    return this.http.post(`${this.baseUrl}/${uri}`, payload, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'auth': this.getToken()
      })
    })
  }
}
