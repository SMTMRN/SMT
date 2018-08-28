import { Component, OnInit } from '@angular/core';
import { Input } from '@angular/core';
import { AppDataService } from '../../../services/app-data/app-data.service';
import { HomeService } from '../../../services/home/home.service';

@Component({
  selector: 'app-coupons',
  templateUrl: './coupons.component.html',
  styleUrls: ['./coupons.component.css']
})
export class CouponsComponent implements OnInit {

  coupons = [];
  constructor(private appData: AppDataService, private homeService: HomeService) {
    if (appData.homeCouponData !== null) {
      this.coupons = appData.homeCouponData;
    }
    else {
      this.homeService.getHomeData().subscribe(data => {
        if (data) {
          this.appData.homeCouponData = data.coupons;
          this.coupons = appData.homeCouponData;
        }
      });
    }
  }

  ngOnInit() {
  }

}
