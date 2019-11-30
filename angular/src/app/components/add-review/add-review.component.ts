import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { ActivatedRoute } from "@angular/router";
import { Router } from "@angular/router";
import { NavigationEnd } from "@angular/router";

@Component({
  selector: "app-add-review",
  templateUrl: "./add-review.component.html",
  styleUrls: ["./add-review.component.css"]
})
export class AddReviewComponent implements OnInit {
  username: String;
  rating: Number;
  comment: String;

  songReview: Object;
  url = "http://localhost:8000/api/songs/"; // Missing :id field
  idURL = this.route.snapshot.params["id"]; // Gets object id from link

  mySubscription: any;

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router
  ) {
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
    // Gets data on a single song object
    this.http.get(this.url + this.idURL).subscribe(data => {
      this.songReview = data;
      console.log(this.songReview);
    });
  }

  onReview() {
    const newReview = {
      review: {
        username: this.username,
        rating: this.rating,
        comment: this.comment
      }
    };

    console.log("Added Review!");
    // console.log(newReview);

    this.http.put(this.url + this.idURL, newReview).subscribe(
      response => {
        console.log(response);
        this.router.navigate(["current/" + this.idURL]);
      },
      error => console.log(error)
    );
  }
}
