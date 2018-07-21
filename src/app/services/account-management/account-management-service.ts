import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { API_CONFIG } from '../api-settings/api-settings';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { catchError } from 'rxjs/operators';
import { Api } from '../api-settings/api';

@Injectable()
export class AccountManagementProvider {

  constructor(public api: Api, public http: HttpClient) {

  }

  login(payload) {
    return this.requestApiCall('login', 'POST', payload);
  }

  registration(payload) {
    return this.requestApiCall('forgotPWD', 'POST', payload);
  }

  recoverPassword(payload) {
    return this.requestApiCall('login', 'POST', payload);
  }

  requestApiCall(endpoint: string, type: string, payload?: any) {
    console.log(payload);
    if (type === 'GET') {
      return this.api.post(API_CONFIG.getEndPoint(endpoint), payload).map((res: any) => {
        return this.returnData(res);
      }).catch(this.handleError);
    }
    if (type === 'POST') {
      return this.api.post(API_CONFIG.getEndPoint(endpoint), payload).map((res: any) => {
        return this.returnData(res);
      }).catch(this.handleError);
    }
  }

  // Return null if error
  private handleError(error: any) {
    const errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.log(errMsg);
    // return Observable.throw(error.message || error);
    return null;
  }

  // Return response Data
  returnData(res) {
    console.log(res);
    if ((res) && (Number(res.statuscode) === 200)) {
      return res;
    } else {
      return null;
    }
  }

}
