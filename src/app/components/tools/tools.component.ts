import { Component, OnInit } from '@angular/core';
import { HomeService } from '../../services/home/home.service';
import { AppDataService } from '../../services/app-data/app-data.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tools',
  templateUrl: './tools.component.html',
  styleUrls: ['./tools.component.css']
})
export class ToolsComponent implements OnInit {
  displayCountFormat: string = "";
  showLoading: boolean = false;
  pageSliderCount: any = [];
  categoryObservable: any;
  category: string = "Compressor";
  selectedDiscount: string = "";
  selectedWaranty: any = "";
  selectedPrice: string = "";
  selectedSubCat: any = [];
  selectedBrands: any = [];
  selectedRating: any = [];
  filteredToolsArray: any = [];
  reloadSubCat = true;
  productPriceRange = {
    max: 0,
    min: 0
  }
  fitToPage = {
    max: 0,
    min: 11,
    count: 12
  }
  public subCat = ["Angle Grinder Machine", "Drill Machine", "Planner Machine", "Power Tools Accessories"];
  public price = [{ name: "0 - 1,000", minVal: 0, maxVal: 1000, value: "0-1000" },
  { name: "1,000 - 10,000", minVal: 1000, maxVal: 10000, value: "1000-10000" },
  { name: "10,000 - 30,000", minVal: 10000, maxVal: 30000, value: "10000-30000" },
  { name: "30,000 - 50,000", minVal: 30000, maxVal: 50000, value: "30000-50000" },
  { name: "50,000 and above", minVal: 50000, maxVal: 100000000, value: "5000-100000000" }];
  public warranty = [{ name: "Warranty", value: "1" }, { name: "Non-Warranty", value: "0" }];
  public discount = ["10", "25 ", "50", "75"];
  public ratings = ["4", "3 ", "2", "1"];
  public brands = ["PowerTex", "MPT ", "Bosch", "Dewalt", "Sun Flower"];
  public offers = ["Special Price", "Buy More, Save More ", "Bank Offer "];
  constructor(public homeServie: HomeService, private appData: AppDataService,
    private router: Router) {
    this.reloadSubCat = true;
    this.selectedBrands.push("");
    if (appData.toolsMenuList.category) {
      this.category = appData.toolsMenuList.category
    }
    if (appData.toolsMenuList.subCategory) {
      this.selectedSubCat.push(appData.toolsMenuList.subCategory);
    }
    else {
      this.selectedSubCat.push("");
    }
    this.getFilteredToolsData(true);
    this.appData.toolsListData = this;
  }

  ngOnInit() {
    console.log("Entered On init")
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
    this.getFilteredToolsData(false);
    console.log(this.selectedDiscount);
  }

  onWarantyClick(waranty) {
    if (waranty == "all") {
      this.selectedWaranty = "";
    }
    else {
      this.selectedWaranty = Number(waranty);
    }
    this.getFilteredToolsData(false);
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
    this.getFilteredToolsData(false);
    console.log(this.selectedPrice);
  }

  newEnteredCategory(category, subCategory) {
    this.category = category;
    this.selectedSubCat = [];
    this.selectedSubCat.push(subCategory)
    this.selectedBrands = [];
    this.selectedBrands.push("");
    this.selectedPrice = "";
    this.selectedWaranty = "";
    this.selectedDiscount = "";
    this.getFilteredToolsData(true);
  }

  onSubCategory(cat) {
    console.log(cat);
    this.selectedSubCat = [];
    this.selectedSubCat.push("");
    var subCats: any = document.getElementsByName("subCat");
    for (let count = 0; count < subCats.length; count++) {
      if (subCats[count].checked) {
        this.selectedSubCat.push(subCats[count].value);
      }
    }
    this.getFilteredToolsData(false);
    console.log(this.selectedSubCat);
  }

  onBrandClick() {
    this.selectedBrands = [];
    this.selectedBrands.push("");
    var brands: any = document.getElementsByName("brands");
    for (let count = 0; count < brands.length; count++) {
      if (brands[count].checked) {
        this.selectedBrands.push(brands[count].value);
      }
    }
    this.getFilteredToolsData(false);
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

  getFilteredToolsData(reload) {
    var payload = {
      "category": String(this.category),
      "subcategory": this.selectedSubCat,
      "brand": this.selectedBrands,
      "pricerange": String(this.selectedPrice),
      "from": 0,
      "to": 12,
      "val": "",
      "warranty": this.selectedWaranty,
      "percentage": String(this.selectedDiscount)
    }
    console.log(payload);
    this.showLoading = true;
    this.homeServie.getFilteredTools(payload).subscribe((tools: any) => {
      this.showLoading = false;
      if (tools != null) {
        this.fitToPage.min = 0;
        this.fitToPage.max = this.fitToPage.count - 1;
        console.log(tools);
        console.log(tools.subcat_count);
        if (reload) {
          this.subCat = tools.subcat_count;
          this.brands = tools.brand_count;
          this.productPriceRange.min = tools.totalminval;
          this.productPriceRange.max = tools.totalmaxval;
        }
        if ((tools.products != null) && (tools.products != undefined)) {
          this.filteredToolsArray = tools.products;
          this.pageSliderCount = [];
          this.fitToPage.min = 0;
          this.fitToPage.max = this.fitToPage.count;
          var sliderCount = Math.ceil(this.filteredToolsArray.length / 12);
          this.pageSliderCount = Array(sliderCount).fill(sliderCount).map((x, i) => i + 1);
          if (this.filteredToolsArray.length > this.fitToPage.count) {
            this.displayCountFormat = "0 - " + String(this.fitToPage.count);
          }
          else{
            this.displayCountFormat = "0 - " + String(this.filteredToolsArray.length);
          }
          console.log(this.pageSliderCount);
        }
        else {
          this.filteredToolsArray = [];
          this.displayCountFormat = "0 - 0";
        }
      }
      else {
        this.filteredToolsArray = [];
        this.displayCountFormat = "0 - 0";
      }
    })
  }

  sortType(type) {
    if (type == "lowToHight") {
      console.log(this.filteredToolsArray);
      this.filteredToolsArray.sort(function (a, b) { return (Number(a.prices[0].offer_price) - Number(b.prices[0].offer_price)) });
      console.log(this.filteredToolsArray);
    }
    if (type == "highToLow") {
      console.log(this.filteredToolsArray);
      this.filteredToolsArray.sort(function (a, b) { return (Number(b.prices[0].offer_price) - Number(a.prices[0].offer_price)) });
      console.log(this.filteredToolsArray);
    }
  }

  loadPageDetails(index) {
    if (index == 1) {
      this.fitToPage.min = 0;
      this.fitToPage.max = this.fitToPage.count;
    }
    else {
      this.fitToPage.min = this.fitToPage.count * (index - 1);
      this.fitToPage.max = (this.fitToPage.count * index) - 1;
    }
    this.displayCountFormat = String(this.fitToPage.min + 1) + " - " + String(this.fitToPage.max + 1)
    console.log(this.fitToPage)
    console.log("this.fitToPage")
  }

  viewDetails(name) {
    this.router.navigate(["/view-details", name]);
  }

}
