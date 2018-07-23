import { Injectable } from '@angular/core';
import { ResponseHandler } from '../api-settings/response-handler';

@Injectable()
export class AccountManagementProvider {

  constructor(private responseHandler: ResponseHandler) {

  }

  login(payload) {
    return this.responseHandler.requestApiCall('login', 'POST', payload);
  }

  registration(payload) {
    return this.responseHandler.requestApiCall('register', 'POST', payload);
  }

  recoverPassword(payload) {
    return this.responseHandler.requestApiCall('recoverPWD', 'POST', payload);
  }

  resetPassword(payload) {
    return this.responseHandler.requestApiCall('resetPwd', 'POST', payload);
  }

}
