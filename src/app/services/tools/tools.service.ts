import { Injectable } from '@angular/core';
import { ResponseHandler } from '../api-settings/response-handler';

@Injectable({
  providedIn: 'root'
})
export class ToolsService {

  constructor(private responseHandler: ResponseHandler) { }

  getToolsData(toolName) {
    return this.responseHandler.callGetDataByUrl('https://www.toolsduniya.in/productdetails?product_name='+String(toolName)+'&userid=');
  }
}
