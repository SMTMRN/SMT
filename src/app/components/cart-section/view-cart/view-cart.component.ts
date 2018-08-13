import { Component, OnInit } from '@angular/core';
import { SampleData } from '../../../../assets/mocks/sample-data';
import { CartService } from '../../../services/cart/cart.service';

@Component({
  selector: 'app-view-cart',
  templateUrl: './view-cart.component.html',
  styleUrls: ['./view-cart.component.css']
})
export class ViewCartComponent implements OnInit {
  itterations: any = [];
  totalItems = 0;
  totalCost = 0;
  totalGST = 0;
  totalPayAmount = 0;
  totalSavings = 0;
  constructor(public sampleData: SampleData, public cartService: CartService) { }

  ngOnInit() {
    // this.itterations = this.sampleData.vishList;
    this.calculateTotalItems();
    this.getCartDetails();
  }

  getCartDetails() {
    const payload = '?user_id=sindhu.seelapureddy@gmail.com';
    // const payload = '?user_id=' + userId;
    this.cartService.cartWishList(payload).subscribe(res => {
      if (res) {
        this.itterations = res.data;
        console.log(this.itterations);
      }
    });
  }

  calculateTotalItems() {
    let numberOfItems = 0;
    let totalAmount = 0;
    let totalSavingAmount = 0;

    for (let count = 0; count < this.itterations.length; count++) {
      numberOfItems = numberOfItems + Number(this.itterations[count].quantity);
      totalAmount = totalAmount + (Number(this.itterations[count].quantity) * Number(this.itterations[count].prices[0].offer_price));
      totalSavingAmount = totalSavingAmount + (Number(this.itterations[count].quantity) *
        (Number(this.itterations[count].prices[0].offer_price) * Number(this.itterations[count].prices[0].percentage) / 100));
      if (count + 1 === this.itterations.length) {
        this.totalItems = numberOfItems;
        this.totalCost = totalAmount;
        this.totalGST = Number((totalAmount * 0.18).toFixed(2));
        this.totalSavings = Number(totalSavingAmount.toFixed(2));
        this.totalPayAmount = Number((this.totalCost + this.totalGST).toFixed(2));
      }
    }
  }

  addItem(_index) {
    this.itterations[_index].quantity = Number(this.itterations[_index].quantity) + 1;
    this.calculateTotalItems();
  }

  removeItem(_index) {
    this.itterations[_index].quantity = Number(this.itterations[_index].quantity) - 1;
    this.calculateTotalItems();
  }

}
