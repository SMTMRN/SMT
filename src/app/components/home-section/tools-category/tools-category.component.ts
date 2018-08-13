import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { SimpleChanges } from '@angular/core';

@Component({
  selector: 'tools-category',
  templateUrl: './tools-category.component.html',
  styleUrls: ['./tools-category.component.css']
})
export class ToolsCategoryComponent implements OnInit {

  @Input() itemCategories;
  constructor() { }

  ngOnInit() {
  }

}
