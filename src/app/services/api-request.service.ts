import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { environment } from "./../../environments/environment";
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiRequestService {

  baseUrl:any = environment.baseUrl;
  userDataChange$ = new BehaviorSubject(false);

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
    return this.http.post(`${this.baseUrl}/${uri}`, payload, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        // 'auth': this.getToken()
      })
    })
  }

  put(uri: string, payload: Object) {
    return this.http.put(`${this.baseUrl}/${uri}`, payload, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        // 'auth': data.token != undefined ? data.token : null
      })
    })
  }

  setData(data) {
    data = JSON.stringify(data);
    localStorage.setItem("userData", data);
    this.userDataChange$.next(true);
  }

  getData() {
    if(localStorage.getItem("userData") != undefined) {
      let data = localStorage.getItem("userData");
      return JSON.parse(data);
    }
    else
      return undefined;
  }

  removeData() {
    localStorage.clear();
    this.userDataChange$.next(false);
  }

  getVideoId(url) {
    var video_id = url.split('v=')[1];
    var ampersandPosition = video_id.indexOf('&');
    if(ampersandPosition != -1) {
      video_id = video_id.substring(0, ampersandPosition);
    }

    return video_id;
  }
}
