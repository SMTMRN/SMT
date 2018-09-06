import { Component, OnInit, OnChanges } from "@angular/core";
import { HomeService } from "../../../services/home/home.service";
import { SimpleChanges } from "@angular/core";
import { GlobalEventManagerService } from "../../../services/event-manager/global-event-manager.service";
import { Router } from "@angular/router";
import { AppDataService } from "../../../services/app-data/app-data.service";
import { CartService } from "../../../services/cart/cart.service";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"]
})
export class HeaderComponent implements OnChanges, OnInit {
  savedCartTotal: any = "";
  savedCartData: any = [];
  userLogged = false;
  categories: any = [];
  username = "";
  constructor(
    private homeService: HomeService,
    private globalEventsManager: GlobalEventManagerService,
    private cartService: CartService,
    private router: Router,
    private appData: AppDataService
  ) {
    this.globalEventsManager.showMainMenuEmitter.subscribe(mode => {
      if (mode !== null) {
        this.showSavedData(mode);
      }
    });
    this.showSavedData(true);
  }

  showSavedData(mode) {
    this.appData.checkUserId().then((userRes: any) => {
      if (userRes !== null) {
        if (userRes.username !== null && userRes.username !== undefined) {
          this.username = userRes.username;
          this.userLogged = true;
        } else {
          this.userLogged = false;
        }
      } else {
        this.userLogged = false;
      }
    });
  }

  ngOnInit() {
    this.getToolsCategory();
  }

  goToViewCart() {
    this.router.navigateByUrl("/view-cart");
  }

  proceedToPay() {
    this.router.navigateByUrl("/place-order");
  }

  ngOnChanges(changes: SimpleChanges): void {}

  signOut() {
    localStorage.removeItem("userInfo");
    localStorage.removeItem("userAddedCartDetails");
    localStorage.removeItem("localAddedCartDetails");
    this.globalEventsManager.showMainMenu(false);
  }

  getToolsCategory() {
    this.homeService.getToolsCategoryData().subscribe(data => {
      if (data) {
        console.log(data);
        this.categories = data.categories;
      }
    });
  }

  sendToTools(categoryName: string, subCategoryName: string) {
    if (this.router.url !== "/library") {
      this.appData.toolsMenuList = {
        category: categoryName,
        subCategory: subCategoryName
      };
      this.router.navigate(["/library"]);
    } else {
      this.appData.reloadToolsData(categoryName, subCategoryName);
    }
  }

  showSavedCartDetails() {
    this.appData.checkUserId().then((userRes: any) => {
      if (userRes !== null) {
        this.appData.checkUserCartDetails().then((cartResp: any) => {
          if (cartResp !== null && cartResp.item_list) {
            this.savedCartData = cartResp.item_list;
            this.savedCartTotal = String(cartResp.grand_total);
          } else {
            this.savedCartData = [];
            this.savedCartTotal = "";
          }
        });
      } else {
        this.appData.checkLocalCartDetails().then((cartResp: any) => {
          if (cartResp !== null && cartResp.item_list) {
            this.savedCartData = cartResp.item_list;
            this.savedCartTotal = String(cartResp.grand_total);
          } else {
            this.savedCartData = [];
            this.savedCartTotal = "";
          }
        });
      }
    });
  }

  deleteCartItem(product) {
    this.appData.checkUserId().then((userRes: any) => {
      if (userRes !== null) {
        this.userDeleteCartDetails(product, userRes);
      } else {
        this.localDeleteCartDetails(product);
      }
    });
  }

  userDeleteCartDetails(item, userRes) {
    var payload = { product: String(item.productdescription) };
    var endpoint = String(userRes.user_id);
    this.cartService.deleteCartDetails(endpoint, payload).subscribe(data => {
      if (data && data.status != "") {
        console.log(data);
        this.userUpdateCartDetails(endpoint);
      }
    });
  }

  localDeleteCartDetails(item) {
    this.appData.checkRandomNumber().then((randomNo: any) => {
      if (randomNo !== null) {
        var payload = { product: String(item.productdescription) };
        var endpoint = String(randomNo);
        this.cartService
          .deleteCartDetails(endpoint, payload)
          .subscribe(data => {
            if (data && data.status != "") {
              console.log(data);
              this.localUpdateCartDetails(endpoint);
            }
          });
      }
    });
  }

  localUpdateCartDetails(payload) {
    this.cartService.localUpdateCartInfo(payload).subscribe(res => {
      console.log(res);
      if (res.status == "success") {
        localStorage.setItem("localAddedCartDetails", JSON.stringify(res));
        this.showSavedCartDetails();
      }
    });
  }

  userUpdateCartDetails(payload) {
    this.cartService.userUpdateCartInfo(payload).subscribe(res => {
      console.log(res);
      if (res.status == "success") {
        localStorage.setItem("userAddedCartDetails", JSON.stringify(res));
        this.showSavedCartDetails();
      }
    });
  }

  viewDetails(name) {
    this.router.navigate(["/view-details", name]);
  }
}
