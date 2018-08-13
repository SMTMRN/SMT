import { Component, OnInit, OnChanges } from '@angular/core';
import { HomeService } from '../../../services/home/home.service';
import { SimpleChanges } from '@angular/core';
import { GlobalEventManagerService } from '../../../services/event-manager/global-event-manager.service';
import { Router } from '@angular/router';

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
    private router: Router) {
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
    else{
      alert("Please login to view the cart details.")
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

}
