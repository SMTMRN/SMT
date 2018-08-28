import { Component, OnInit } from "@angular/core";
import { SampleData } from "../../../../assets/mocks/sample-data";
import * as $ from "jquery";
import { ActivatedRoute } from "@angular/router";
import { ToolsService } from "../../../services/tools/tools.service";
import { CartService } from "../../../services/cart/cart.service";
import { AppDataService } from "../../../services/app-data/app-data.service";
@Component({
  selector: "app-view-item-details",
  templateUrl: "./view-item-details.component.html",
  styleUrls: ["./view-item-details.component.css"]
})
export class ViewItemDetailsComponent implements OnInit {
  itemInitialCost: number = 0;
  itemFinalCost: number = 0;
  itemDetails: any = {};
  itemPrice = 0;
  discountPercentage = 0;
  discountAmount = 0;
  itemQuantity = 1;

  constructor(
    public sampleData: SampleData,
    private route: ActivatedRoute,
    private toolsService: ToolsService,
    private cartService: CartService,
    private appData: AppDataService
  ) {}

  ngOnInit() {
    var itemName = this.route.snapshot.paramMap.get("product_name");
    this.loadItemDetails(itemName);
    // $(document).ready(function() {
    //   $(window).load(function() {
    //     // The slider being synced must be initialized first
    //     $('#carousel').flexslider({
    //         animation: "slide",
    //         controlNav: false,
    //         animationLoop: false,
    //         slideshow: false,
    //         itemWidth: 75,
    //         // itemHeight: 75,
    //         maxItems: 6,
    //         //smoothHeight:200,
    //         // itemMargin: 5,
    //         asNavFor: '#slider'
    //     });

    //     $('#slider').flexslider({
    //         animation: "slide",
    //         controlNav: false,
    //         animationLoop: false,
    //         slideshow: false,
    //         sync: "#carousel"
    //     });
    // });

    // });
    // this.getCartDetails();
  }

  // tslint:disable-next-line:use-life-cycle-interface
  ngAfterViewInit() {}

  loadItemDetails(name) {
    this.toolsService.getToolsData(name).subscribe(data => {
      if (data) {
        console.log(data);
        this.itemDetails = data;
        this.itemDetails.quantity = 1;
        this.calculateTotalItems();
      }
    });
  }

  calculateTotalItems() {
    this.itemInitialCost =
      this.itemDetails.quantity *
      Number(this.itemDetails.price_info.offer_price);
    this.itemFinalCost =
      this.itemDetails.quantity *
      Number(this.itemDetails.price_info.enduser_price);
  }

  addItem() {
    this.itemDetails.quantity = Number(this.itemDetails.quantity) + 1;
    this.calculateTotalItems();
  }

  removeItem() {
    this.itemDetails.quantity = Number(this.itemDetails.quantity) - 1;
    this.calculateTotalItems();
  }

  addToCart() {
    var payload = {
      user_id: "",
      random_no: "",
      orderItem: []
    };

    this.appData.checkUserId().then((res:any)=>{
      console.log(res);
    })
    // this.cartService.addToCartInitialize(payload);
  }

  openDetails(){
    
  }
}
