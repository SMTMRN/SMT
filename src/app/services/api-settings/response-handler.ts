import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/map";
import "rxjs/add/operator/catch";
import { catchError } from "rxjs/operators";
import { Api } from "./api";
import { API_CONFIG } from "./api-settings";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { RequestOptions } from "@angular/http";

@Injectable({
  providedIn: "root"
})
export class ResponseHandler {
  constructor(public api: Api, private httpClient: HttpClient) {}

  requestApiCallGet(endpoint: string, payload?: any) {
    return this.api
      .get(API_CONFIG.apiBaseUrl + API_CONFIG.getEndPoint(endpoint), payload)
      .map((res: any) => {
        console.log(res);
        return this.returnData(res);
      })
      .catch(this.handleError);
  }

  requestGetIp() {
    return this.api
      .get("https://jsonip.com/")
      .map((res: any) => {
        console.log(res);
        return this.returnData(res);
      })
      .catch(this.handleError);
  }

  requestLoginApiCallPost(endpoint: string, payload: any, authorization: any) {
    const header = new HttpHeaders({
      "Content-Type": "application/json",
      secret_key: API_CONFIG.secret_key,
      Authorization: authorization
    });
    return this.api
      .post(
        API_CONFIG.apiBaseUrl + API_CONFIG.getEndPoint(endpoint),
        payload,
        null,
        header
      )
      .map((res: any) => {
        console.log(res);
        return this.returnData(res);
      })
      .catch(this.handleError);
  }

  requestApiCallPost(endpoint: string, payload: any) {
    return this.api
      .post(API_CONFIG.apiBaseUrl + API_CONFIG.getEndPoint(endpoint), payload)
      .map((res: any) => {
        console.log(res);
        return this.returnData(res);
      })
      .catch(this.handleError);
  }

  // Return null if error
  private handleError(error: any) {
    const errMsg = error.message
      ? error.message
      : error.status
        ? `${error.status} - ${error.statusText}`
        : "Server error";
    console.log(errMsg);
    // return Observable.throw(error.message || error);
    return null;
  }

  // Return response Data
  returnData(res) {
    console.log(res);
    // if ((res) && (Number(res.statuscode) === 200)) {
    //     return res;
    // } else {
    //     return null;
    // }
    if (res) {
      return res;
    } else {
      return null;
    }
  }

  callGetDataByUrl(url) {
    return this.api
      .get(url)
      .map((res: any) => {
        console.log(res);
        return this.returnData(res);
      })
      .catch(this.handleError);
  }

  callPostDataByUrl(url, body) {
    const header = new HttpHeaders({
      "Content-Type":
        "application/json, application/x-www-form-urlencoded;charset=UTF-8",
      secret_key: API_CONFIG.secret_key
    });
    return this.api
      .post(url, body, null, header)
      .map((res: any) => {
        console.log(res);
        return this.returnData(res);
      })
      .catch(this.handleError);
  }

  callDeleteDataByUrl(url, body) {
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type":
          "application/json, application/x-www-form-urlencoded;charset=UTF-8",
        secret_key: String(API_CONFIG.secret_key)
      }),
      body: body
    };
    return this.api
      .delete(url, httpOptions)
      .map((res: any) => {
        console.log(res);
        return this.returnData(res);
      })
      .catch(this.handleError);
  }
}
