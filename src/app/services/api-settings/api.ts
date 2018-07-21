import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_CONFIG } from '../api-settings/api-settings';
import 'rxjs/add/operator/timeout';

@Injectable()
export class Api {
  url: string = API_CONFIG.apiBaseUrl;
  header: any;
  fileHeader: any;
  timeOut = 120000;

  constructor(public http: HttpClient) {
    this.header = new HttpHeaders({ 'Content-Type': 'application/json' });
  }

  get(endpoint: string, params?: any, token?: any) {
    let getUrl = this.url + endpoint;
    if ((params != null) && (params !== undefined)) {
      for (const p of params) {
        getUrl = getUrl + '/' + p;
      }
    }
    if (token) {
      return this.http.get(getUrl, this.getHeader(token));
    } else {
      return this.http.get(getUrl, { headers: this.header });
    }
  }

  post(endpoint: string, body: any, token?: any) {
    return this.http.post(this.url + endpoint, JSON.stringify(body), { headers: this.header }).timeout(this.timeOut);
  }

  put(endpoint: string, body: any, reqOpts?: any, token?: any) {
    return this.http.put(this.url + endpoint, body, this.getHeader(token));
  }

  delete(endpoint: string, token?: any) {
    return this.http.delete(this.url + endpoint, this.getHeader(token));
  }

  patch(endpoint: string, body: any, token?: any) {
    return this.http.put(this.url + endpoint, body, this.getHeader(token));
  }

  private getHeader(token?: any) {
    return token;
  }
}
