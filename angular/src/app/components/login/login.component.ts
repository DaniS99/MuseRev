import { Component, OnInit } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { AuthService } from "../../services/auth.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  email: String;
  password: String;

  constructor(
    private authService: AuthService,
    private router: Router,
    private http: HttpClient
  ) {}

  ngOnInit() {}

  onLogin() {
    let url = "http://localhost:8000/api/users/login";

    const fillUser = {
      user: {
        email: this.email,
        password: this.password
      }
    };

    this.http.post(url, fillUser).subscribe(
      response => {
        console.log(response);
        console.log("Worked!");
        this.authService.storeToken(response);
        this.router.navigate(["current"]);
      },
      error => {
        console.log(error);
        console.log("No such user exists!");
      }
    );
  }
}
