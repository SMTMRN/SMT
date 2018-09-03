import { Component, OnInit } from "@angular/core";

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
  constructor() {}

  ngOnInit() {}

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
}
