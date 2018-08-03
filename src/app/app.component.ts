import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  constructor(public http: HttpClient) {
    this.getIp();
  }
  getIp() {
    this.http.get<{ ip: string }>('https://jsonip.com')
      .subscribe(data => {
        console.log(data);
      });
  }
}
