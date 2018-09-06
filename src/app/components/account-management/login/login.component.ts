import { Component, OnInit } from "@angular/core";
import {
  Validators,
  FormBuilder,
  FormGroup,
  FormControl
} from "@angular/forms";
import { AccountManagementProvider } from "../../../services/account-management/account-management-service";
import { Router } from "@angular/router";
import { GlobalEventManagerService } from "../../../services/event-manager/global-event-manager.service";
import { CartService } from "../../../services/cart/cart.service";
import { AppDataService } from "../../../services/app-data/app-data.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  ngEmail = "";
  loginValidator: any;
  ngPassword = "";
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private accountServices: AccountManagementProvider,
    private cartService: CartService,
    private appData: AppDataService,
    private globalEventsManager: GlobalEventManagerService
  ) {}

  ngOnInit() {
    this.doValidations();
  }

  doValidations() {
    this.loginValidator = this.formBuilder.group({
      email: new FormControl(
        "sindhu.seelapureddy@gmail.com",
        Validators.compose([
          Validators.required,
          Validators.pattern("^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$")
        ])
      ),
      password: new FormControl("sindhu", Validators.required)
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
            this.router.navigate(["/"]);
          }
        });
      }
    });
  }
  // email::::::::::sindhu.seelapureddy@gmail.com
  // password:::::::sindhu

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
      }else {
        this.userUpdateCartDetails([]);
      }
    });
  }

  userUpdateCartDetails(localData) {
    this.appData.checkUserId().then((userRes: any) => {
      if (userRes !== null) {
        this.cartService.userUpdateCartInfo(userRes.user_id).subscribe(res => {
          console.log(res);
          if (res.status == "success") {
            if (localData && localData.item_list && localData.item_list.length > 0) {
              if (res.item_list) {
                for (
                  let count = 0;
                  count < localData.item_list.length;
                  count++
                ) {
                  res.item_list.push(localData.item_list[count]);
                  if (count + 1 == localData.item_list.length) {
                    var payload = {
                      user_id: String(userRes.user_id),
                      order_status: "init",
                      orderitem: res.item_list
                    };
                    this.updateUserAPICart(payload, res);
                    console.log("res");
                    console.log(res);
                  }
                }
              }
            } else {
              localStorage.setItem("userAddedCartDetails", JSON.stringify(res));
            }
          } else if (localData && localData.item_list && localData.item_list.length > 0) {
            res = localData;
            localStorage.setItem("userAddedCartDetails", JSON.stringify(res));
          }
          console.log("res");
          console.log(res);
        });
      }
    });
  }

  updateUserAPICart(payload, localRes){
    this.cartService.userAddToCartInitialize(payload).subscribe(res => {
      console.log(res);
      // localStorage.setItem(
      //   "userAddedCartDetails",
      //   JSON.stringify(localRes)
      // );
      this.userCartDetails(payload.user_id)
      localStorage.removeItem("randomNum");
      localStorage.removeItem("localAddedCartDetails");
    });
  }

  userCartDetails(payload) {
    this.cartService.userUpdateCartInfo(payload).subscribe(res => {
      console.log(res);
      if (res.status == "success") {
        localStorage.setItem("userAddedCartDetails", JSON.stringify(res));
      }
    });
  }
}
