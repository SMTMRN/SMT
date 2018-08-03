import { Injectable } from '@angular/core';
import { ResponseHandler } from '../api-settings/response-handler';

@Injectable()
export class AccountManagementProvider {

  constructor(private responseHandler: ResponseHandler) {

  }

  login(payload, authorization) {
    return this.responseHandler.requestLoginApiCallPost('login', payload, authorization);
  }

  getIp() {
    return this.responseHandler.requestGetIp();
  }

  registration(payload) {
    return this.responseHandler.requestApiCallPost('register', payload);
  }

  recoverPassword(payload) {
    return this.responseHandler.requestApiCallPost('recoverPWD', payload);
  }

  resetPassword(payload) {
    return this.responseHandler.requestApiCallPost('resetPwd', payload);
  }

}
