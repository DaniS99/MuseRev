import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { NavigationEnd } from "@angular/router";

@Component({
  selector: "app-admin",
  templateUrl: "./admin.component.html",
  styleUrls: ["./admin.component.css"]
})
export class AdminComponent implements OnInit {
  mySubscription: any;
  privacy: String;
  dmca: String;

  list: Object;
  url = "http://localhost:8000/api/songs/listPolicy";
  upURL = "http://localhost:8000/api/songs/updatePolicy/";

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
    this.http.post(this.url, null).subscribe(data => {
      this.list = data;
      console.log(this.list);
    });
  }

  onPriv() {
    let policy = {
      policy: this.privacy
    };
    //console.log(policy);
    //console.log(this.list[0]._id);

    let polId = this.list[0]._id; // Grabs the id of the first policy

    this.http.put(this.upURL + polId, policy).subscribe(
      response => {
        console.log(response);
        this.router.navigate(["about"]);
      },
      error => console.log(error)
    );

    console.log("Privacy Policy updated!");
  }

  onDmca() {
    let policy = {
      policy: this.dmca
    };
    //console.log(policy);
    //console.log(this.list[1]._id);

    let polId = this.list[1]._id; // Grabs the id of the first policy

    this.http.put(this.upURL + polId, policy).subscribe(
      response => {
        console.log(response);
        this.router.navigate(["about"]);
      },
      error => console.log(error)
    );

    console.log("DMCA Policy updated!");
  }
}
