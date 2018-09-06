import { Component, OnInit } from "@angular/core";
import { SampleData } from "../../../../assets/mocks/sample-data";
import { CartService } from "../../../services/cart/cart.service";
import { AppDataService } from "../../../services/app-data/app-data.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-view-cart",
  templateUrl: "./view-cart.component.html",
  styleUrls: ["./view-cart.component.css"]
})
export class ViewCartComponent implements OnInit {
  savedCartTotal: any = "";
  savedCartData: any = [];
  itterations: any = [];
  totalItems = 0;
  totalCost = 0;
  totalGST = 0;
  totalPayAmount = 0;
  showLoading: boolean = false;
  totalSavings = 0;
  constructor(
    public sampleData: SampleData,
    public cartService: CartService,
    private router: Router,
    private appData: AppDataService
  ) {}

  ngOnInit() {
    this.getCartDetails();
  }

  getCartDetails() {
    this.appData.checkUserId().then((userRes: any) => {
      if (userRes !== null) {
        this.appData.checkUserCartDetails().then((cartResp: any) => {
          if (cartResp !== null && cartResp.item_list) {
            this.savedCartData = cartResp.item_list;
            this.savedCartTotal = String(cartResp.grand_total);
            this.calculateTotalItems();
          } else {
            this.savedCartData = [];
            this.savedCartTotal = "0";
            this.calculateTotalItems();
          }
          console.log(this.savedCartData);
        });
      } else {
        this.appData.checkLocalCartDetails().then((cartResp: any) => {
          if (cartResp !== null && cartResp.item_list) {
            this.savedCartData = cartResp.item_list;
            this.savedCartTotal = String(cartResp.grand_total);
            this.calculateTotalItems();
          } else {
            this.savedCartData = [];
            this.savedCartTotal = "0";
            this.calculateTotalItems();
          }
          console.log(this.savedCartData);
        });
      }
    });
  }

  calculateTotalItems() {
    this.totalItems = 0;
    this.totalSavings = 0;
    this.totalCost = 0;
    this.totalPayAmount = 0;
    this.totalGST = 0;
    if (this.savedCartData.length > 0) {
      for (let count = 0; count < this.savedCartData.length; count++) {
        console.log(this.savedCartData[count]);
        if (this.savedCartData[count]) {
          this.totalItems += Number(this.savedCartData[count].qty);
          var itemsArray = this.savedCartData[count];
          this.totalSavings +=
            Math.round(
              (Number(itemsArray.sub_total) -
                Number(this.calculateDiscountPrice(itemsArray))) *
                100
            ) / 100;
        }
      }
      this.totalCost =
        Math.round(
          (Number(this.savedCartTotal) - Number(this.savedCartTotal) * 0.18) *
            100
        ) / 100;
      this.totalPayAmount = Number(this.savedCartTotal);
      this.totalGST =
        Math.round((Number(this.totalPayAmount) - this.totalCost) * 100) / 100;
    }
  }

  addItem(_index) {
    this.savedCartData[_index].qty = Number(this.savedCartData[_index].qty) + 1;
    this.addToCart(_index, this.savedCartData[_index].qty);
  }

  removeItem(_index) {
    this.savedCartData[_index].qty = Number(this.savedCartData[_index].qty) - 1;
    this.addToCart(_index, this.savedCartData[_index].qty);
  }

  calculatePercentage(item) {
    return (
      Math.round(
        (this.calculateDiscountPrice(item) / Number(item.sub_total)) * 100 * 100
      ) / 100
    );
  }

  calculateDiscountPrice(item) {
    return Number(item.offer_price) * Number(item.qty);
  }

  addToCart(index, qty) {
    var item = {
      index: index,
      qty: qty
    };
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
        payload.orderitem[item.index].qty = item.qty;
      }
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
        payload.orderitem[item.index].qty = item.qty;
      }
      this.appData.checkRandomNumber().then((randomRes: any) => {
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

  localUpdateCartDetails(payload) {
    this.cartService.localUpdateCartInfo(payload).subscribe(res => {
      console.log(res);
      if (res.status == "success") {
        localStorage.setItem("localAddedCartDetails", JSON.stringify(res));
        this.getCartDetails();
      }
    });
  }

  userUpdateCartDetails(payload) {
    this.cartService.userUpdateCartInfo(payload).subscribe(res => {
      console.log(res);
      if (res.status == "success") {
        localStorage.setItem("userAddedCartDetails", JSON.stringify(res));
        this.getCartDetails();
      }
    });
  }

  deleteCartItem(product) {
    this.appData.checkUserId().then((userRes: any) => {
      if (userRes !== null) {
        this.userDeleteCartDetails(product, userRes);
      } else {
        this.localDeleteCartDetails(product);
      }
    });
  }

  userDeleteCartDetails(item, userRes) {
    var payload = { product: String(item.productdescription) };
    var endpoint = String(userRes.user_id);
    this.cartService.deleteCartDetails(endpoint, payload).subscribe(data => {
      if (data && data.status != "") {
        console.log(data);
        this.userUpdateCartDetails(endpoint);
      }
    });
  }

  localDeleteCartDetails(item) {
    this.appData.checkRandomNumber().then((cartResp: any) => {
      if (cartResp !== null) {
        var payload = { product: String(item.productdescription) };
        var endpoint = String(cartResp);
        this.cartService
          .deleteCartDetails(endpoint, payload)
          .subscribe(data => {
            if (data && data.status != "") {
              console.log(data);
              this.localUpdateCartDetails(endpoint);
            }
          });
      }
    });
  }

  viewDetails(name) {
    this.router.navigate(["/view-details", name]);
  }

}
