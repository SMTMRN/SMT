import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'offers-ads',
  templateUrl: './offers-ads.component.html',
  styleUrls: ['./offers-ads.component.css']
})
export class OffersAdsComponent implements OnInit {
  @Input() offers_ads;
  constructor() { }

  ngOnInit() {
  }

}
