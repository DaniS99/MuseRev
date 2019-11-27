import { Component, OnInit } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { AuthService } from "../../services/auth.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.css"]
})
export class DashboardComponent implements OnInit {
  url = "http://localhost:8000/api/users/current";
  listURL = "http://localhost:8000/api/songs/list";
  list: Object;

  username: String;
  rating: Number;
  comment: String;

  constructor(
    private authService: AuthService,
    private router: Router,
    private http: HttpClient
  ) {}

  ngOnInit() {
    console.log("Secure in dash!");

    // Sends token via header to backend call "/current" to authorize currently signed in user

    //console.log(this.authService.loadToken());
    let token = localStorage.getItem("id_token");
    console.log(token);

    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append("Content-Type", "application/json");
    headers = headers.append("Authorization", "Token " + token);

    this.http.get(this.url, { headers: headers }).subscribe(
      response => {
        console.log("Successful Auth!");
        console.log("Valid: " + this.authService.loggedIn());
      },
      error => {
        console.log("Failed");
      }
    );

    // Reuses song listing componeent, but adds its own fields for logged in users to add a review
    this.http.get(this.listURL).subscribe(data => {
      this.list = data;
      console.log(this.list);
    });

    //
  }
}
