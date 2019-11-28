import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { ActivatedRoute } from "@angular/router";

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

  constructor(private http: HttpClient, private route: ActivatedRoute) {}

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
      },
      error => console.log(error)
    );
  }
}
