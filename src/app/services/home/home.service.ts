import { Injectable } from '@angular/core';
import { ResponseHandler } from '../api-settings/response-handler';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(private responseHandler: ResponseHandler) { }

  getHomeData() {
    return this.responseHandler.callGetDataByUrl('https://www.toolsmela.com/homepage');
  }

  getToolsCategoryData() {
    return this.responseHandler.callGetDataByUrl('https://www.toolsduniya.com/categories');
  }
}
