import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";

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

  constructor(private http: HttpClient) {}

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
