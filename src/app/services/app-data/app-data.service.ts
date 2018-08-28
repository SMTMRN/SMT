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
    var result:any;
    var promise = new Promise((resolve, reject) => {
      console.log("Async Work Complete");
      console.log(localStorage.getItem("userInfo"));
      if (localStorage.getItem("userInfo")) {
        return localStorage.getItem("userInfo");
      } else {
        return false;
      }
    });
    console.log(promise);
    return promise;

    // console.log(localStorage.getItem("userInfo"));
    // if(localStorage.getItem("userInfo")){
    //   return localStorage.getItem("userInfo");
    // }
    // else{
    //   return "XXXXXXXXXXXXXXX";
    // }
  }
}
