import { Component, OnInit } from "@angular/core";
import { Input } from "@angular/core";
import { Router } from "@angular/router";
import { AppDataService } from "../../../services/app-data/app-data.service";
import { CartService } from "../../../services/cart/cart.service";

@Component({
  selector: "app-tool-list",
  templateUrl: "./tool-list.component.html",
  styleUrls: ["./tool-list.component.css"]
})
export class ToolListComponent implements OnInit {
  @Input()
  toolsArray = [];
  fitToPage = {
    min: 0,
    max: 10
  };
  constructor(
    private appData: AppDataService,
    private router: Router,
    private cartService: CartService
  ) {}

  ngOnInit() {}

  viewDetails(name) {
    this.router.navigate(["/view-details", name]);
  }

  addToCart(item) {
    console.log(item);
    this.appData.checkUserId().then((userRes: any) => {
      if (userRes !== null) {
        this.userAddCartDetails(item, userRes);
      } else {
        this.localAddCartDetails(item);
      }
    });
  }
 
  userAddCartDetails(item, userRes) {
    var response = userRes;
    console.log(response);
    this.appData.checkUserCartDetails().then((cartResp: any) => {
      var payload = {
        user_id: "",
        order_status: "init",
        orderitem: []
      };
      if (cartResp !== null) {
        payload.orderitem = cartResp.item_list;
      }
      payload.orderitem.push({
        productdescription: String(item.upload_name),
        qty: "1"
      });
      payload.user_id = String(response.user_id);
      this.cartService.userAddToCartInitialize(payload).subscribe(res => {
        console.log(res);
        if (res.status != "") {
          alert(res.status);
          this.userUpdateCartDetails(payload.user_id);
        }
      });
    });
  }

  localAddCartDetails(item) {
    this.appData.checkLocalCartDetails().then((cartResp: any) => {
      var payload = {
        user_id: "",
        random_no: "",
        orderitem: []
      };
      if (cartResp !== null) {
        payload.orderitem = cartResp.item_list;
      }
      this.appData.checkRandomNumber().then((randomRes: any) => {
        payload.orderitem.push({
          productdescription: String(item.upload_name),
          qty: "1"
        });
        if (randomRes !== null) {
          payload.random_no = String(randomRes);
        }
        console.log(payload);
        this.cartService.localAddToCartInitialize(payload).subscribe(res => {
          console.log(res);
          if (res.status != "") {
            alert(res.status);
            if (res.random_number) {
              localStorage.setItem("randomNum", res.random_number);
              this.localUpdateCartDetails(res.random_number);
            } else {
              this.localUpdateCartDetails(payload.random_no);
            }
          }
        });
      });
    });
  }

  openDetails() {}

  localUpdateCartDetails(payload) {
    this.cartService.localUpdateCartInfo(payload).subscribe(res => {
      console.log(res);
      if (res.status == "success") {
        localStorage.setItem("localAddedCartDetails", JSON.stringify(res));
      }
    });
  }

  userUpdateCartDetails(payload) {
    this.cartService.userUpdateCartInfo(payload).subscribe(res => {
      console.log(res);
      if (res.status == "success") {
        localStorage.setItem("userAddedCartDetails", JSON.stringify(res));
      }
    });
  }

  ///////////////////////////////////////////////////////////////////

  addToFavouriteList(item) {
    console.log("Entered Favourite");
    var favouriteList = [];
    this.appData.checkFavouriteItems().then((favouriteRes: any) => {
      if (favouriteRes) {
        if (favouriteRes.length >= 10) {
          alert("You have reached maximum items in Favourite list.");
        } else {
          favouriteList = favouriteRes;
          favouriteList.push(item);
          localStorage.setItem("favouriteItems", JSON.stringify(favouriteList));
          alert("Item added to favouite list");
        }
      } else {
        favouriteList.push(item);
        localStorage.setItem("favouriteItems", JSON.stringify(favouriteList));
        alert("Item added to favouite list");
      }
    });
  }

  addToCompareList(item) {
    var compareList = [];
    this.appData.checkCompareItems().then((compareRes: any) => {
      if (compareRes) {
        if (compareRes.length >= 4) {
          alert("You have reached maximum items in Compare list.");
        } else {
          compareList = compareRes;
          compareList.push(item);
          localStorage.setItem("compareItems", JSON.stringify(compareList));
          alert("Item added to Compare list");
        }
      } else {
        compareList.push(item);
        localStorage.setItem("compareItems", JSON.stringify(compareList));
        alert("Item added to Compare list");
      }
    });
  }
}
