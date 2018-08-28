import { Component, OnInit, Input } from '@angular/core';
import { OnChanges } from '@angular/core';
import { SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { HomeService } from '../../../services/home/home.service';

@Component({
  selector: 'app-offers',
  templateUrl: './offers.component.html',
  styleUrls: ['./offers.component.css']
})
export class OffersComponent implements OnChanges, OnInit {
  public offersAll = [];
  offerProductTypes = ["All Products", "Drill Machine", "Angle Grinder", "Hammers"];
  arrivalProductTypes = ["All Products", "Angle Grinder"];
  selectedOffers = [];
  selectedNewArrival = [];
  selectedTypes = {
    "offer": "all products",
    "newArrival": "all products"
  }
  selectedOfferType = "all products"
  @Input() offers = [];
  @Input() newArrivals = [];
  constructor(public homeService: HomeService, private router: Router) {
 
  }

  ngOnInit() {

  }

  ngOnChanges(changes: SimpleChanges): void {
    // this.findOffersType();
    // this.findNewArrivalType();
    this.filterOffers('All Products');
    this.filterNewArrivals('All Products');
  }

  getProductTypeLength() {
    return this.offerProductTypes.length;
  }

  getArrivalsTypeLength() {
    return this.arrivalProductTypes.length;
  }

  // findOffersType() {
  //   console.log("Entering");
  //   this.offerProductTypes = [{ type: "all products" }];
  //   if (this.offers.length > 0) {
  //     for (let count = 0; count < this.offers.length; count++) {
  //       const catLenth = this.getProductTypeLength();
  //       var subCat = this.offers[count].upload_subcategory
  //       for (let subcount = 0; subcount < catLenth; subcount++) {
  //         if (this.offerProductTypes[subcount].type == subCat) {
  //           subcount = catLenth + 1;
  //         }
  //         else if (catLenth == subcount + 1) {
  //           this.offerProductTypes.push({ type: subCat });
  //           subcount = catLenth + 1;
  //         }
  //         if ((count + 1 >= this.offers.length) && (subcount + 1 >= catLenth)) {
  //           this.filterOffers('all products');
  //         }
  //       }
  //     }
  //     console.log(this.offerProductTypes);
  //   }
  // }

  filterOffers(type: string) {
    var payload = "";
    if (type == 'All Products') {
      payload = ""
    }
    else {
      payload = type;
    }
    this.homeService.getFilteredOffers(payload).subscribe((data: any) => {
      console.log(data)
      this.selectedOffers = data.offerscats;
    })

    console.log(this.selectedOffers);
    this.selectedTypes.offer = String(type);
  }

  // findNewArrivalType() {
  //   console.log("Entering");
  //   this.arrivalProductTypes = [{ type: "all products" }];
  //   if (this.newArrivals.length > 0) {
  //     for (let count = 0; count < this.newArrivals.length; count++) {
  //       const catLenth = this.getArrivalsTypeLength();
  //       var subCat = this.newArrivals[count].upload_subcategory
  //       for (let subcount = 0; subcount < catLenth; subcount++) {
  //         if (this.arrivalProductTypes[subcount].type == subCat) {
  //           subcount = catLenth + 1;
  //         }
  //         else if (catLenth == subcount + 1) {
  //           this.arrivalProductTypes.push({ type: subCat });
  //           subcount = catLenth + 1;
  //         }
  //         if ((count + 1 >= this.newArrivals.length) && (subcount + 1 >= catLenth)) {
  //           this.filterNewArrivals('all products');
  //         }
  //       }
  //     }
  //     console.log(this.arrivalProductTypes);
  //   }
  // }

  // filterNewArrivals(type: string) {
  //   if (type == 'All Products') {
  //     this.selectedNewArrival = this.newArrivals;
  //   }
  //   else {
  //     this.selectedNewArrival = [];
  //     for (let count = 0; count < this.newArrivals.length; count++) {
  //       if (this.newArrivals[count].upload_subcategory == type) {
  //         this.selectedNewArrival.push(this.newArrivals[count]);
  //       }
  //     }
  //   }
  //   console.log(this.selectedNewArrival);
  //   this.selectedTypes.newArrival = String(type);
  // }

  filterNewArrivals(type: string) {
    var payload = "";
    if (type == 'All Products') {
      payload = ""
    }
    else {
      payload = type;
    }
    this.homeService.getFilteredNewArrivals(payload).subscribe((data: any) => {
      console.log(data)
      this.selectedNewArrival = data.newarrivalcats;
    })

    console.log(this.selectedNewArrival);
    this.selectedTypes.newArrival = String(type);

  }

  viewDetails(name) {
    this.router.navigate(["/view-details", name]);
  }

}
