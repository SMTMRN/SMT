import { Component, OnInit } from '@angular/core';
import { HomeService } from '../../services/home/home.service';

@Component({
  selector: 'app-tools',
  templateUrl: './tools.component.html',
  styleUrls: ['./tools.component.css']
})
export class ToolsComponent implements OnInit {
  category: string = "Compressor";
  selectedDiscount: string = "";
  selectedWaranty: string = "";
  selectedPrice: string = "";
  selectedSubCat: any = [];
  selectedBrands: any[];
  selectedRating: any[];
  public subCat = ["Angle Grinder Machine", "Drill Machine", "Planner Machine", "Power Tools Accessories"];
  public price = ["0 - 1,000", "1,000 - 10,000", "10,000 - 50,000", "50,000 - 1,00,000", "1,00,000 Above"];
  public waranty = ["Warranty", "Non-Warranty "];
  public discount = ["10", "25 ", "50", "75"];
  public ratings = ["4", "3 ", "2", "1"];
  public brands = ["PowerTex", "MPT ", "Bosch", "Dewalt", "Sun Flower"];
  public offers = ["Special Price", "Buy More, Save More ", "Bank Offer "];
  constructor(public homeServie: HomeService) {
    this.getFilteredToolsData()
   }
  onAngleGrinder() {

  }
  onDiscountClick(disc) {
    if (disc == "all") {
      this.selectedDiscount = "";
    }
    else {
      this.selectedDiscount = String(disc);
    }
    console.log(this.selectedDiscount);
  }

  onWarantyClick(waranty) {
    if (waranty == "all") {
      this.selectedWaranty = "";
    }
    else {
      this.selectedWaranty = String(waranty);
    }
    console.log(this.selectedWaranty);
  }

  onPriceclick(price) {
    console.log(price);
    if (price == "all") {
      this.selectedPrice = "";
    }
    else {
      this.selectedPrice = String(price);
    }
    console.log(this.selectedPrice);
  }

  ngOnInit() {
  }

  onSubCategory(cat) {
    console.log(cat);
    this.selectedSubCat = [];
    var subCats: any = document.getElementsByName("subCat");
    for (let count = 0; count < subCats.length; count++) {
      if (subCats[count].checked) {
        this.selectedSubCat.push(subCats[count].value);
      }
    }
    this.getFilteredToolsData();
    console.log(this.selectedSubCat);
  }

  onBrandClick() {
    this.selectedBrands = [];
    var brands: any = document.getElementsByName("brands");
    for (let count = 0; count < brands.length; count++) {
      if (brands[count].checked) {
        this.selectedBrands.push(brands[count].value);
      }
    }
    console.log(this.selectedBrands);
  }

  onRatingClick() {
    this.selectedRating = [];
    var rate: any = document.getElementsByName("rating");
    for (let count = 0; count < rate.length; count++) {
      if (rate[count].checked) {
        this.selectedRating.push(rate[count].value);
      }
    }
    console.log(this.selectedRating);
  }

  getFilteredToolsData() {
    var payload = {
      "category": String(this.category),
      "subcategory": this.selectedSubCat,
      "brand": this.selectedBrands,
      "pricerange": String(this.selectedPrice),
      "from": 0,
      "to": 12,
      "val": "",
      "warranty": String(this.selectedWaranty),
      "percentage": String(this.selectedDiscount)
    }

    this.homeServie.getFilteredTools(payload).subscribe((tools:any)=>{
      if(tools != null){
        console.log(tools);
        console.log(tools.subcat_count);
        this.subCat = tools.subcat_count;
      }
    })
  }

}
