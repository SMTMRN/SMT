import { Component, OnInit } from '@angular/core';
import { SampleData } from '../../../../assets/mocks/sample-data';

@Component({
  selector: 'app-view-item-details',
  templateUrl: './view-item-details.component.html',
  styleUrls: ['./view-item-details.component.css']
})
export class ViewItemDetailsComponent implements OnInit {
  itemData: any;
  itemPrice = 0;
  discountPercentage = 0;
  discountAmount = 0;
  itemQuantity = 1;

  constructor(public sampleData: SampleData) { }

  ngOnInit() {
    this.itemData = this.sampleData.itemDetails;
    this.calculateTotalItems();
    // this.getCartDetails();
  }

  // tslint:disable-next-line:use-life-cycle-interface
  ngAfterViewInit() {

  }

  calculateTotalItems() {
    console.log(this.itemData);
    this.discountPercentage = Number(this.itemData.prices[0].percentage);
    this.itemPrice = 0;
    this.discountAmount = 0;
    console.log(this.itemQuantity);
    for (let count = 0; count < this.itemQuantity; count++) {
      console.log(this.itemData.prices[0].enduser_price);
      this.itemPrice = (this.itemPrice + Number(this.itemData.prices[0].enduser_price));
      this.discountAmount = (this.discountAmount + Number(this.itemData.prices[0].offer_price));
    }
  }

  addItem() {
    this.itemQuantity = Number(this.itemQuantity) + 1;
    this.calculateTotalItems();
  }

  removeItem() {
    this.itemQuantity = Number(this.itemQuantity) - 1;
    this.calculateTotalItems();
  }

}
