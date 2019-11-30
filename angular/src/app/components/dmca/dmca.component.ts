import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { NavigationEnd } from "@angular/router";

@Component({
  selector: "app-dmca",
  templateUrl: "./dmca.component.html",
  styleUrls: ["./dmca.component.css"]
})
export class DmcaComponent implements OnInit {
  list: Object;

  dateRec: Date;
  dateSent: Date;
  dateDisRec: Date;

  url = "http://localhost:8000/api/songs/list";

  mySubscription: any;

  constructor(private http: HttpClient, private router: Router) {
    // Copied from: https://medium.com/@rakshitshah/refresh-angular-component-without-navigation-148a87c2de3f
    this.router.routeReuseStrategy.shouldReuseRoute = function() {
      return false;
    };

    this.mySubscription = this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        // Trick the Router into believing it's last link wasn't previously loaded
        this.router.navigated = false;
      }
    });
  }

  ngOnDestroy() {
    if (this.mySubscription) {
      this.mySubscription.unsubscribe();
    }
  }

  ngOnInit() {
    this.http.get(this.url).subscribe(data => {
      this.list = data;
      console.log(this.list);
    });
  }

  onIssue() {
    console.log("Issue notice!");

    let url = "http://localhost:8000/api/songs/createNotice";

    const notice = {
      dateRec: this.dateRec,
      dateSent: this.dateSent,
      dateDisRec: this.dateDisRec
    };

    this.http.post(url, notice).subscribe(
      response => console.log(response),
      error => console.log(error)
    );
  }
}
