import { Component, OnInit } from "@angular/core";
import { AppDataService } from "../../../../services/app-data/app-data.service";
import { CartService } from "../../../../services/cart/cart.service";

@Component({
  selector: "app-place-order",
  templateUrl: "./place-order.component.html",
  styleUrls: ["./place-order.component.css"]
})
export class PlaceOrderComponent implements OnInit {
  pageShown = "order-login";
  deliveryAddressFlag: any = false;
  orderSummaryFlag: any = false;
  paymentOptionsFlag: any = false;

  /////////////////////////
  savedCartTotal: any = "";
  savedCartData: any = [];
  itterations: any = [];
  totalItems = 0;
  totalCost = 0;
  totalGST = 0;
  totalPayAmount = 0;
  totalSavings = 0;
  ////////////////////////
  constructor(
    public cartService: CartService,
    private appData: AppDataService
  ) {}

  ngOnInit() {
    this.getCartDetails()
  }

  openPage(page) {
    this.pageShown = page;
  }

  getLoginDetails(event) {
    if (event) {
      console.log(event);
      this.deliveryAddressFlag = true;
      this.openPage("delivery-address");
    }
  }

  getAddressDetails(event) {
    if (event) {
      console.log(event);
      this.orderSummaryFlag = true;
      this.openPage("order-summary");
    }
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

  calculateDiscountPrice(item) {
    return Number(item.offer_price) * Number(item.qty);
  }
}
