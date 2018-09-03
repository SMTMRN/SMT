import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { FormBuilder, FormControl, Validators } from "@angular/forms";
import { AccountManagementProvider } from "../../../../services/account-management/account-management-service";
import { GlobalEventManagerService } from "../../../../services/event-manager/global-event-manager.service";
import { AppDataService } from "../../../../services/app-data/app-data.service";
import { CartService } from "../../../../services/cart/cart.service";

@Component({
  selector: "app-order-login",
  templateUrl: "./order-login.component.html",
  styleUrls: ["./order-login.component.css"]
})
export class OrderLoginComponent implements OnInit {
  username: any = "";
  userLoggedIn: boolean;
  ngEmail = "";
  loginValidator: any;
  ngPassword = "";
  @Output()
  loginDetails = new EventEmitter<string>();
  constructor(
    private formBuilder: FormBuilder,
    private accountServices: AccountManagementProvider,
    private cartService: CartService,
    private appData: AppDataService,
    private globalEventsManager: GlobalEventManagerService
  ) {
    this.globalEventsManager.showMainMenuEmitter.subscribe(mode => {
      if (mode !== null) {
        if (mode) {
          this.userLoggedIn = true;
          console.log("Entering Global");
          // this.onLoginDetailsSubmit(true);
          var userData = JSON.parse(localStorage.getItem("userInfo"));
          if (userData !== null && userData !== undefined && userData !== []) {
            this.username = userData.username;
          }
        } else {
          this.userLoggedIn = false;
        }
      }
    });
  }

  ngOnInit() {
    this.doValidations();
  }

  doValidations() {
    this.loginValidator = this.formBuilder.group({
      email: new FormControl(
        "",
        Validators.compose([
          Validators.required,
          Validators.pattern("^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$")
        ])
      ),
      password: new FormControl("", Validators.required)
    });
  }

  // tslint:disable-next-line:member-ordering
  validation_messages = {
    email: [
      { type: "required", message: "Email is required*" },
      { type: "pattern", message: "Enter a valid email" }
    ],
    password: [{ type: "required", message: "Password is required*" }]
  };

  loginUser() {
    const payload = {
      ip_address: "",
      user_type: "web"
    };
    let authorization = "";
    const userDetails = String(this.ngEmail) + ":" + String(this.ngPassword);
    this.accountServices.getIp().subscribe(data => {
      if (data) {
        authorization = btoa(userDetails);
        payload.ip_address = String(data.ip);
        this.accountServices.login(payload, authorization).subscribe(res => {
          if (res) {
            console.log(res);
            localStorage.setItem("userInfo", JSON.stringify(res));
            this.globalEventsManager.showMainMenu(true);
            this.localUpdateCartDetails();
            this.onLoginDetailsSubmit(true);
          }
        });
      }
    });
  }

  onLoginDetailsSubmit(story) {
    console.log("Entering Emit");
    this.loginDetails.emit(story);
  }

  localUpdateCartDetails() {
    this.appData.checkRandomNumber().then((randomRes: any) => {
      if (randomRes !== null) {
        var payload = String(randomRes);
        this.cartService.localUpdateCartInfo(payload).subscribe(res => {
          console.log(res);
          if (res.status == "success") {
            res;
            this.userUpdateCartDetails(res);
          } else {
            this.userUpdateCartDetails([]);
          }
        });
      }
    });
  }

  userUpdateCartDetails(localData) {
    this.appData.checkUserId().then((userRes: any) => {
      if (userRes !== null) {
        this.cartService.userUpdateCartInfo(userRes.user_id).subscribe(res => {
          console.log(res);
          if (res.status == "success") {
            if (localData.item_list.length > 0) {
              if (res.item_list) {
                for (
                  let count = 0;
                  count < localData.item_list.length;
                  count++
                ) {
                  res.item_list.push(localData.item_list[count]);
                  if (count + 1 == localData.item_list.length) {
                    localStorage.setItem(
                      "userAddedCartDetails",
                      JSON.stringify(res)
                    );
                    console.log("res");
                    console.log(res);
                  }
                }
              }
            } else {
              localStorage.setItem("userAddedCartDetails", JSON.stringify(res));
            }
          } else if (localData.item_list.length > 0) {
            res = localData;
            localStorage.setItem("userAddedCartDetails", JSON.stringify(res));
          }
          console.log("res");
          console.log(res);
        });
      }
    });
  }
}
