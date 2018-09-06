import { Component, OnInit } from '@angular/core';
import { AppDataService } from '../../../services/app-data/app-data.service';
import { Router } from '@angular/router';
import { CartService } from '../../../services/cart/cart.service';

@Component({
  selector: 'app-compare-items',
  templateUrl: './compare-items.component.html',
  styleUrls: ['./compare-items.component.css']
})
export class CompareItemsComponent implements OnInit {

  displayMessage: string = "";
  compareItems: any = [];
  constructor(private appData: AppDataService,
    private router: Router,
    private cartService: CartService) {}

  ngOnInit() {
    this.appData.checkCompareItems().then((compareRes: any) => {
      if (compareRes) {
        this.displayMessage = "Compare items";
        this.compareItems = compareRes;
      } else {
        this.displayMessage = "No Compare items to display";
      }
    });
  }

  deleteCompareItem(offerItem, i){
    this.compareItems.splice(i,1);
    if(this.compareItems.length ==0){
      localStorage.removeItem("compareItems");
      this.displayMessage = "No Compare items to display";
    }
    else{
      localStorage.setItem("compareItems", JSON.stringify(this.compareItems));
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

  addToFavouriteList(item) {
    console.log("Entered Favourite");
    var favouriteList = [];
    this.appData.checkFavouriteItems().then((favouriteRes: any) => {
      if (favouriteRes) {
        if (favouriteRes.length >= 10) {
          alert(
            "You have reached maximum items in Favourite list."
          );
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

}
