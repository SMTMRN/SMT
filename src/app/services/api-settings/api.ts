import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { API_CONFIG } from '../api-settings/api-settings';
import 'rxjs/add/operator/timeout';

@Injectable()
export class Api {
  url: string = API_CONFIG.apiBaseUrl;
  header: any;
  fileHeader: any;
  timeOut = 120000;

  constructor(private httpClient: HttpClient) {
    this.header = new HttpHeaders({ 'Content-Type': 'application/json', 'secret_key': API_CONFIG.secret_key });
  }

  get(url: string, params?: any, token?: any) {
    let getUrl = url;
    if ((params != null) && (params !== undefined)) {
      getUrl = getUrl + params;
      console.log(getUrl);
    }
    // if ((params != null) && (params !== undefined)) {
    //   for (const p of params) {
    //     getUrl = getUrl + '/' + p;
    //   }
    // }
    if (token) {
      return this.httpClient.get(getUrl, this.getHeader(token));
    } else {
      return this.httpClient.get(getUrl, { headers: this.header });
    }
  }

  post(url: string, body: any, token?: any, header?: any) {
    if (header) {
      return this.httpClient.post(url, JSON.stringify(body), { headers: header }).timeout(this.timeOut);
    } else {
      return this.httpClient.post(url, JSON.stringify(body), { headers: this.header }).timeout(this.timeOut);
    }
  }

  put(url: string, body: any, reqOpts?: any, token?: any) {
    return this.httpClient.put(url, body, this.getHeader(token));
  }

  delete(url: string, token?: any) {
    return this.httpClient.delete(url, this.getHeader(token));
  }

  patch(url: string, body: any, token?: any) {
    return this.httpClient.put(url, body, this.getHeader(token));
  }

  private getHeader(token?: any) {
    return token;
  }
}
