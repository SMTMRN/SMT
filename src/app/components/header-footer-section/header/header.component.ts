import { Component, OnInit, OnChanges } from '@angular/core';
import { HomeService } from '../../../services/home/home.service';
import { SimpleChanges } from '@angular/core';
import { GlobalEventManagerService } from '../../../services/event-manager/global-event-manager.service';
import { Router } from '@angular/router';
import { AppDataService } from '../../../services/app-data/app-data.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnChanges, OnInit {

  userLogged = false;
  categories: any = [];
  username = "";
  constructor(private homeService: HomeService, private globalEventsManager: GlobalEventManagerService,
    private router: Router, private appData: AppDataService) {
    this.globalEventsManager.showMainMenuEmitter.subscribe((mode) => {
      if (mode !== null) {
        this.userLogged = mode;
        if (mode) {
          var userData = JSON.parse(localStorage.getItem('userInfo'));
          if (userData !== null && userData !== undefined && userData !== []) {
            this.username = userData.username;
          }
        }
      }
    });
  }

  ngOnInit() {
    this.getToolsCategory();
  }

  goToViewCart() {
    var userData = JSON.parse(localStorage.getItem('userInfo'));
    if (userData !== null && userData !== undefined && userData !== []) {
      this.router.navigateByUrl('/view-cart');
    }
    else {
      this.router.navigateByUrl('/login');
    }
  }

  proceedToPay() {
    var userData = JSON.parse(localStorage.getItem('userInfo'));
    if (userData !== null && userData !== undefined && userData !== []) {
      this.router.navigateByUrl('/place-order');
    }
    else {
      this.router.navigateByUrl('/login');
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
  }

  singOut() {
    localStorage.removeItem("userInfo")
    this.globalEventsManager.showMainMenu(false);
  }

  getToolsCategory() {
    this.homeService.getToolsCategoryData().subscribe(data => {
      if (data) {
        console.log(data);
        this.categories = data.categories;
      }
    });
  }

  sendToTools(categoryName: string, subCategoryName: string) {

    if (this.router.url !== '/library') {
      this.appData.toolsMenuList = { category: categoryName, subCategory: subCategoryName };
      this.router.navigate(["/library"]);
    }
    else {
      this.appData.reloadToolsData(categoryName, subCategoryName);
    }
  }

}
