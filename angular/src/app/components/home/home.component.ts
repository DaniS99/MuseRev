import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"]
})
export class HomeComponent implements OnInit {
  list: Object;

  url = "http://localhost:8000/api/songs/list";

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http.get(this.url).subscribe(data => {
      this.list = data;
      console.log(this.list);
    });
  }
}
