import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Component({
  selector: "app-about",
  templateUrl: "./about.component.html",
  styleUrls: ["./about.component.css"]
})
export class AboutComponent implements OnInit {
  list: Object;
  url = "http://localhost:8000/api/songs/listPolicy";

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http.post(this.url, null).subscribe(data => {
      this.list = data;
      console.log(this.list);
    });
  }
}
