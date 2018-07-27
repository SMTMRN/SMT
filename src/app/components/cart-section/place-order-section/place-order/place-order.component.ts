import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-place-order',
  templateUrl: './place-order.component.html',
  styleUrls: ['./place-order.component.css']
})
export class PlaceOrderComponent implements OnInit {

  pageShown = 'order-login';
  constructor() { }

  ngOnInit() {
  }

  openPage(page) {
    this.pageShown = page;
  }

}
