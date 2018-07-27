import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tools',
  templateUrl: './tools.component.html',
  styleUrls: ['./tools.component.css']
})
export class ToolsComponent implements OnInit {

  public subCat= ["Angle Grinder Machine","Drill Machine","Planner Machine","Power Tools Accessories"];
  public price= ["0 - 1,000","1,000 - 10,000","10,000 - 50,000","50,000 - 1,00,000","1,00,000 Above"];
  public waranty= ["Warranty","Non-Warranty ","Show All "];
  public discount= ["10","25 ","50","75"];
  public ratings= ["4","3 ","2","1"];
  public brands= ["PowerTex","MPT ","Bosch","Dewalt","Sun Flower"];
  public offers= ["Special Price","Buy More, Save More ","Bank Offer "];
  constructor() { }
  onAngleGrinder() {

  }
  onSubCategory(cat) {
    console.log(cat);
  }
  onDiscountClick(disc) {
    console.log(disc);
  }
  onPriceclick(price) {
    console.log(price);
  }
  onWarantyClick(waranty) {
    console.log(waranty);
  }
  ngOnInit() {
  }

}
