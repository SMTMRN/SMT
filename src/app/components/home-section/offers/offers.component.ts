import { Component, OnInit, Input } from "@angular/core";
import { OnChanges } from "@angular/core";
import { SimpleChanges } from "@angular/core";
import { Router } from "@angular/router";
import { HomeService } from "../../../services/home/home.service";
import { AppDataService } from "../../../services/app-data/app-data.service";
import { CartService } from "../../../services/cart/cart.service";

@Component({
  selector: "app-offers",
  templateUrl: "./offers.component.html",
  styleUrls: ["./offers.component.css"]
})
export class OffersComponent implements OnChanges, OnInit {
  public offersAll = [];
  offerProductTypes = [
    "All Products",
    "Drill Machine",
    "Angle Grinder",
    "Hammers"
  ];
  arrivalProductTypes = ["All Products", "Angle Grinder"];
  selectedOffers = [];
  selectedNewArrival = [];
  selectedTypes = {
    offer: "all products",
    newArrival: "all products"
  };
  selectedOfferType = "all products";
  @Input()
  offers = [];
  @Input()
  newArrivals = [];
  constructor(
    public homeService: HomeService,
    private router: Router,
    private cartService: CartService,
    private appData: AppDataService
  ) {}

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges): void {
    // this.findOffersType();
    // this.findNewArrivalType();
    this.filterOffers("All Products");
    this.filterNewArrivals("All Products");
  }

  getProductTypeLength() {
    return this.offerProductTypes.length;
  }

  getArrivalsTypeLength() {
    return this.arrivalProductTypes.length;
  }

  filterOffers(type: string) {
    var payload = "";
    if (type == "All Products") {
      payload = "";
    } else {
      payload = type;
    }
    this.homeService.getFilteredOffers(payload).subscribe((data: any) => {
      console.log(data);
      this.selectedOffers = data.offerscats;
    });

    console.log(this.selectedOffers);
    this.selectedTypes.offer = String(type);
  }

  filterNewArrivals(type: string) {
    var payload = "";
    if (type == "All Products") {
      payload = "";
    } else {
      payload = type;
    }
    this.homeService.getFilteredNewArrivals(payload).subscribe((data: any) => {
      console.log(data);
      this.selectedNewArrival = data.newarrivalcats;
    });

    console.log(this.selectedNewArrival);
    this.selectedTypes.newArrival = String(type);
  }

  viewDetails(name) {
    this.router.navigate(["/view-details", name]);
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
    var response = JSON.parse(userRes);
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
        productdescription: String(item.upload_name),
        qty: "1"
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
          productdescription: String(item.upload_name),
          qty: "1"
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
