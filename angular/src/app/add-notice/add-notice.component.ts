import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-add-notice",
  templateUrl: "./add-notice.component.html",
  styleUrls: ["./add-notice.component.css"]
})
export class AddNoticeComponent implements OnInit {
  dateRec: Date;
  dateSent: Date;
  dateDisRec: Date;

  songReview: Object;
  url = "http://localhost:8000/api/songs/"; // Missing :id field
  noticeURL = "http://localhost:8000/api/songs/createNotice/"; // Missing :id field
  idURL = this.route.snapshot.params["id"]; // Gets object id from link

  constructor(private http: HttpClient, private route: ActivatedRoute) {}

  ngOnInit() {
    // Gets data on a single song object
    this.http.get(this.url + this.idURL).subscribe(data => {
      this.songReview = data;
      console.log(this.songReview);
    });
  }

  onIssue() {
    const newNotice = {
      notice: {
        dateRec: this.dateRec,
        dateSent: this.dateSent,
        dateDisRec: this.dateDisRec
      }
    };

    console.log(newNotice);
    console.log("Added Notice!");
    // console.log(newReview);
    console.log(this.noticeURL + this.idURL);

    this.http.put(this.noticeURL + this.idURL, newNotice).subscribe(
      response => {
        console.log(response);
      },
      error => console.log(error)
    );
  }
}
