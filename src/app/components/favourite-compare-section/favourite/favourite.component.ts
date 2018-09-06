import { Component, OnInit } from "@angular/core";
import { AppDataService } from "../../../services/app-data/app-data.service";
import { CartService } from "../../../services/cart/cart.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-favourite",
  templateUrl: "./favourite.component.html",
  styleUrls: ["./favourite.component.css"]
})
export class FavouriteComponent implements OnInit {
  displayMessage: string = "";
  favouriteItems: any = [];
  constructor(private appData: AppDataService,
    private router: Router,
    private cartService: CartService) {}

  ngOnInit() {
    this.appData.checkFavouriteItems().then((favouriteRes: any) => {
      if (favouriteRes) {
        this.displayMessage = "Favourite items";
        this.favouriteItems = favouriteRes;
      } else {
        this.displayMessage = "No Favourite items to display";
      }
    });
  }

  deleteFavouriteItem(offerItem, i){
    this.favouriteItems.splice(i,1);
    if(this.favouriteItems.length ==0){
      localStorage.removeItem("favouriteItems");
      this.displayMessage = "No Favourite items to display";
    }
    else{
      localStorage.setItem("favouriteItems", JSON.stringify(this.favouriteItems));
    }
  }

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

  addToCompareList(item) {
    var compareList = [];
    this.appData.checkCompareItems().then((compareRes: any) => {
      if (compareRes) {
        if (compareRes.length >= 4) {
          alert(
            "You have reached maximum items in Compare list."
          );
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
