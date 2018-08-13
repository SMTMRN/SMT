import { Component, OnInit, Input } from '@angular/core';
import { OnChanges } from '@angular/core';
import { SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-offers',
  templateUrl: './offers.component.html',
  styleUrls: ['./offers.component.css']
})
export class OffersComponent implements OnChanges, OnInit {
  public offersAll = [];
  offerProductTypes = [];
  arrivalProductTypes = [];
  selectedOffers = [];
  selectedNewArrival = [];
  selectedTypes = {
    "offer": "all products",
    "newArrival": "all products"
  }
  selectedOfferType = "all products"
  @Input() offers = [];
  @Input() newArrivals = [];
  constructor() {

  }

  ngOnInit() {

  }

  ngOnChanges(changes: SimpleChanges): void {
    this.findOffersType();
    this.findNewArrivalType();
  }

  getProductTypeLength() {
    return this.offerProductTypes.length;
  }

  getArrivalsTypeLength(){
    return this.arrivalProductTypes.length;
  }

  findOffersType() {
    console.log("Entering");
    this.offerProductTypes = [{ type: "all products" }];
    if (this.offers.length > 0) {
      for (let count = 0; count < this.offers.length; count++) {
        const catLenth = this.getProductTypeLength();
        var subCat = this.offers[count].upload_subcategory
        for (let subcount = 0; subcount < catLenth; subcount++) {
          if (this.offerProductTypes[subcount].type == subCat) {
            subcount = catLenth + 1;
          }
          else if (catLenth == subcount + 1) {
            this.offerProductTypes.push({ type: subCat });
            subcount = catLenth + 1;
          }
          if ((count + 1 >= this.offers.length) && (subcount + 1 >= catLenth)) {
            this.filterOffers('all products');
          }
        }
      }
      console.log(this.offerProductTypes);
    }
  }

  filterOffers(type: string) {
    if (type == 'all products') {
      this.selectedOffers = this.offers;
    }
    else {
      this.selectedOffers = [];
      for (let count = 0; count < this.offers.length; count++) {
        if (this.offers[count].upload_subcategory == type) {
          this.selectedOffers.push(this.offers[count]);
        }
      }
    }
    console.log(this.selectedOffers);
    this.selectedTypes.offer = String(type);
  }

  findNewArrivalType() {
    console.log("Entering");
    this.arrivalProductTypes = [{ type: "all products" }];
    if (this.newArrivals.length > 0) {
      for (let count = 0; count < this.newArrivals.length; count++) {
        const catLenth = this.getArrivalsTypeLength();
        var subCat = this.newArrivals[count].upload_subcategory
        for (let subcount = 0; subcount < catLenth; subcount++) {
          if (this.arrivalProductTypes[subcount].type == subCat) {
            subcount = catLenth + 1;
          }
          else if (catLenth == subcount + 1) {
            this.arrivalProductTypes.push({ type: subCat });
            subcount = catLenth + 1;
          }
          if ((count + 1 >= this.newArrivals.length) && (subcount + 1 >= catLenth)) {
            this.filterNewArrivals('all products');
          }
        }
      }
      console.log(this.arrivalProductTypes);
    }
  }

  filterNewArrivals(type: string) {
    if (type == 'all products') {
      this.selectedNewArrival = this.newArrivals;
    }
    else {
      this.selectedNewArrival = [];
      for (let count = 0; count < this.newArrivals.length; count++) {
        if (this.newArrivals[count].upload_subcategory == type) {
          this.selectedNewArrival.push(this.newArrivals[count]);
        }
      }
    }
    console.log(this.selectedNewArrival);
    this.selectedTypes.newArrival = String(type);
  }

}
