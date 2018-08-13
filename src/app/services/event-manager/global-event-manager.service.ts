import { Injectable } from '@angular/core';
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { Observable } from "rxjs/Observable";
@Injectable({
  providedIn: 'root'
})
export class GlobalEventManagerService {
  private _showMainMenu: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(null);
  public showMainMenuEmitter: Observable<boolean> = this._showMainMenu.asObservable();
  constructor() {
    this.showMainMenu(Boolean(localStorage.getItem('currentUser')));
  }

  showMainMenu(ifShow: boolean) {
    this._showMainMenu.next(ifShow);
  }
}
