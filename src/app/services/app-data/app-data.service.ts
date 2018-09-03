import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import "rxjs/add/observable/of";

@Injectable({
  providedIn: "root"
})
export class AppDataService {
  toolsListData: any = null;
  homeCouponData: any = null;
  toolsMenuList: any = null;
  constructor() {}

  reloadToolsData(category, subCategory) {
    this.toolsListData.newEnteredCategory(category, subCategory);
  }

  checkUserId() {
    var promise = new Promise((resolve, reject) => {
      console.log(JSON.parse(localStorage.getItem("userInfo")));
      if (localStorage.getItem("userInfo")) {
        resolve(JSON.parse(localStorage.getItem("userInfo")));
      } else {
        resolve(null);
      }
    });
    return promise;
  }

  checkRandomNumber() {
    var promise = new Promise((resolve, reject) => {
      console.log(localStorage.getItem("randomNum"));
      if (localStorage.getItem("randomNum")) {
        resolve(localStorage.getItem("randomNum"));
      } else {
        resolve(null);
      }
    });
    return promise;
  }

  checkUserCartDetails() {
    var promise = new Promise((resolve, reject) => {
      console.log(JSON.parse(localStorage.getItem("userAddedCartDetails")));
      if (localStorage.getItem("userAddedCartDetails")) {
        resolve(JSON.parse(localStorage.getItem("userAddedCartDetails")));
      } else {
        resolve(null);
      }
    });
    return promise;
  }

  checkLocalCartDetails() {
    var promise = new Promise((resolve, reject) => {
      console.log(JSON.parse(localStorage.getItem("localAddedCartDetails")));
      if (localStorage.getItem("localAddedCartDetails")) {
        resolve(JSON.parse(localStorage.getItem("localAddedCartDetails")));
      } else {
        resolve(null);
      }
    });
    return promise;
  }
}
