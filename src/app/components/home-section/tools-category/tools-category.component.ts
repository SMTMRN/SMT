import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { SimpleChanges } from '@angular/core';
import { AppDataService } from '../../../services/app-data/app-data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'tools-category',
  templateUrl: './tools-category.component.html',
  styleUrls: ['./tools-category.component.css']
})
export class ToolsCategoryComponent implements OnInit {

  @Input() itemCategories;
  constructor(private appData: AppDataService, private router: Router) { }

  ngOnInit() {
  }

  goToTools(category) {
    this.appData.toolsMenuList = { category: category, subCategory: "" };
    this.router.navigate(["/library"]);
  }

}
