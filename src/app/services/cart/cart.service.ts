import { Injectable } from '@angular/core';
import { ResponseHandler } from '../api-settings/response-handler';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private responseHandler: ResponseHandler) { }

  cartWishList(payload) {
    return this.responseHandler.requestApiCall('wishListView', 'GET', payload);
  }

}
