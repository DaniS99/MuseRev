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

  constructor(
    private authService: AuthService,
    private router: Router,
    private http: HttpClient
  ) {}

  ngOnInit() {
    console.log("Secure in dash!");

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
  }
}
