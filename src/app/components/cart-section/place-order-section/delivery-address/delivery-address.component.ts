import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { FormBuilder, FormControl, Validators } from "@angular/forms";

@Component({
  selector: "app-delivery-address",
  templateUrl: "./delivery-address.component.html",
  styleUrls: ["./delivery-address.component.css"]
})
export class DeliveryAddressComponent implements OnInit {
  @Output()
  loginDetails = new EventEmitter<string>();
  addressValidator: any;
  ngName: string = "";
  ngPhoneNumber: string = "";
  ngPinCode: string = "";
  ngLocality: string = "";
  ngAddress: string = "";
  ngCity: string = "";
  ngState: string = "";
  ngLandMark: string = "";
  ngAlternatePhone: string = "";
  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.doValidations();
  }

  doValidations() {
    this.addressValidator = this.formBuilder.group({
      name: new FormControl("", Validators.required),
      phoneNumber: new FormControl(
        "",
        Validators.compose([
          Validators.required,
          Validators.pattern("[0-9]{10}")
        ])
      ),
      pinCode: new FormControl("", Validators.required),
      locality: new FormControl("", Validators.required),
      address: new FormControl("", Validators.required),
      city: new FormControl("", Validators.required),
      state: new FormControl("", Validators.required)
    });
  }

  // tslint:disable-next-line:member-ordering
  validation_messages = {
    name: [{ type: "required", message: "Name is required*" }],
    phoneNumber: [
      { type: "required", message: "Phone number is required*" },
      { type: "pattern", message: "Enter a valid mobile number*" }
    ],
    pinCode: [{ type: "required", message: "Pin code is required*" }],
    locality: [{ type: "required", message: "Locality is required*" }],
    address: [{ type: "required", message: "Address is required*" }],
    city: [{ type: "required", message: "City is required*" }],
    state: [{ type: "required", message: "City is required*" }]
  };
}
