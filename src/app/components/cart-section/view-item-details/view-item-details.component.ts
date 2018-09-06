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
  upsellProducts: any = [];
  relatedProducts: any = [];
  showLoading: boolean = false;

  constructor(
    public sampleData: SampleData,
    private route: ActivatedRoute,
    private toolsService: ToolsService,
    private cartService: CartService,
    private appData: AppDataService
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.loadItemDetails(params.product_name);
    });
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
    this.showLoading = true;
    this.toolsService.getToolsData(name).subscribe(data => {
      this.showLoading = false;
      if (data) {
        console.log(data);
        if (data.Related_Products) {
          this.relatedProducts = data.Related_Products;
        }
        if (data.Related_Products) {
          this.upsellProducts = data.Upsell_Products;
        }
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

  addToCart(item) {
    console.log(item);
    this.appData.checkUserId().then((userRes: any) => {
      if (userRes !== null) {
        this.userAddCartDetails(item, userRes);
      } else {
        this.localAddCartDetails(item);
      }
    });
  }

  userAddCartDetails(item, userRes) {
    var response = userRes;
    console.log(response);
    this.appData.checkUserCartDetails().then((cartResp: any) => {
      var payload = {
        user_id: "",
        order_status: "init",
        orderitem: []
      };
      if (cartResp !== null) {
        payload.orderitem = cartResp.item_list;
      }
      payload.orderitem.push({
        productdescription: String(item.Product.upload_name),
        qty: String(item.quantity)
      });
      payload.user_id = String(response.user_id);
      this.cartService.userAddToCartInitialize(payload).subscribe(res => {
        console.log(res);
        if (res.status != "") {
          alert(res.status);
          this.userUpdateCartDetails(payload.user_id);
        }
      });
    });
  }

  localAddCartDetails(item) {
    this.appData.checkLocalCartDetails().then((cartResp: any) => {
      var payload = {
        user_id: "",
        random_no: "",
        orderitem: []
      };
      if (cartResp !== null) {
        payload.orderitem = cartResp.item_list;
      }
      this.appData.checkRandomNumber().then((randomRes: any) => {
        payload.orderitem.push({
          productdescription: String(item.Product.upload_name),
          qty: String(item.quantity)
        });
        if (randomRes !== null) {
          payload.random_no = String(randomRes);
        }
        console.log(payload);
        this.cartService.localAddToCartInitialize(payload).subscribe(res => {
          console.log(res);
          if (res.status != "") {
            alert(res.status);
            if (res.random_number) {
              localStorage.setItem("randomNum", res.random_number);
              this.localUpdateCartDetails(res.random_number);
            } else {
              this.localUpdateCartDetails(payload.random_no);
            }
          }
        });
      });
    });
  }

  openDetails() {}

  localUpdateCartDetails(payload) {
    this.cartService.localUpdateCartInfo(payload).subscribe(res => {
      console.log(res);
      if (res.status == "success") {
        localStorage.setItem("localAddedCartDetails", JSON.stringify(res));
      }
    });
  }

  userUpdateCartDetails(payload) {
    this.cartService.userUpdateCartInfo(payload).subscribe(res => {
      console.log(res);
      if (res.status == "success") {
        localStorage.setItem("userAddedCartDetails", JSON.stringify(res));
      }
    });
  }
}
