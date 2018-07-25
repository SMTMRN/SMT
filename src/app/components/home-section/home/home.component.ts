import { Component, OnInit } from '@angular/core';
import { SampleData } from '../../../../assets/mocks/sample-data';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  itemCategories = [];
  constructor(public sampleData: SampleData) { }

  ngOnInit() {
    this.itemCategories = this.sampleData.itemCategories;
  }

}
