import { Component, OnInit } from '@angular/core';
import { SampleData } from '../../../../assets/mocks/sample-data';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  itemCategories = [];
  public imgObj = [
    {name:"carosel1",src:'1'},
    {name:"carosel2",src:'1'},
    {name:"carosel3",src:'1'}
  ];
  public topBrands = [
    {name:"carosel1",src:'co'},
    {name:"carosel2",src:'co1'},
    {name:"carosel3",src:'co'},
    {name:"carosel1",src:'co3'},
    {name:"carosel2",src:'co'},
    {name:"carosel3",src:'co1'}
  ];
  public emergingBrands = [
    {name:"carosel1",src:'co'},
    {name:"carosel2",src:'co1'},
    {name:"carosel3",src:'co'},
    {name:"carosel1",src:'co3'},
    {name:"carosel2",src:'co'},
    {name:"carosel3",src:'co1'}
  ];
  public offers = [];
  public offers_ads = [];
  public newArrivals = [];
  constructor(public sampleData: SampleData) { }

  ngOnInit() {
    this.itemCategories = this.sampleData.itemCategories;
  }

}
