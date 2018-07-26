import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'top-brands',
  templateUrl: './top-brands.component.html',
  styleUrls: ['./top-brands.component.css']
})
export class TopBrandsComponent implements OnInit {

  @Input() topBrands;
  @Input() emergingBrands;
  constructor() { }

  ngOnInit() {
  }

}
