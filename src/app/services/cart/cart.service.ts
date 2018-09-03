import { Injectable } from '@angular/core';
import { ResponseHandler } from '../api-settings/response-handler';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private responseHandler: ResponseHandler) { }

  cartWishList(payload) {
    return this.responseHandler.requestApiCallGet('wishListView', payload);
  }

  localAddToCartInitialize(payload){
    return this.responseHandler.callPostDataByUrl('https://www.shopmytool.com/initiateorder', payload);
  }

  localUpdateCartInfo(payload){
    return this.responseHandler.callGetDataByUrl('https://www.shopmytool.com/initiateorder?random_no='+String(payload));
  }

  userAddToCartInitialize(payload){
    return this.responseHandler.callPostDataByUrl('https://www.shopmytool.com/initiateorder', payload);
  }
  
  userUpdateCartInfo(payload){
    return this.responseHandler.callGetDataByUrl('https://www.shopmytool.com/initiateorder?userid='+String(payload));
  }
  
  deleteCartDetails(endpoint,payload){
    return this.responseHandler.callDeleteDataByUrl('https://www.shopmytool.com/initiateorder?userid='+String(endpoint), payload);
  }
}
