import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-add-review",
  templateUrl: "./add-review.component.html",
  styleUrls: ["./add-review.component.css"]
})
export class AddReviewComponent implements OnInit {
  songReview: Object;
  url = "http://localhost:8000/api/songs/"; // Missing :id field

  constructor(private http: HttpClient, private route: ActivatedRoute) {}

  ngOnInit() {
    let idURL = this.route.snapshot.params["id"]; // Gets object id from link

    this.http.get(this.url + idURL).subscribe(data => {
      this.songReview = data;
      console.log(this.songReview);
    });
  }

  onReview() {
    console.log("Added Review!");
  }
}
