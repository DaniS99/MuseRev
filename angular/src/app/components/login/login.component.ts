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
  token: any;
  checkAdmin: boolean;

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
        // Send the user, get the token in exchange
        console.log(response);
        console.log("Worked!");
        this.token = response;
        this.authService.storeToken(response);

        // Check to see whether isAdmin or not
        // check if isAdmin == true
        // Might want to change POST method to create users to return object ID
        // Then use that ID to reference its isAdmin property and route user accordingly
        let adminURL = "http://localhost:8000/api/users/checkAdmin";
        let check;

        let headers: HttpHeaders = new HttpHeaders();
        headers = headers.append("Content-Type", "application/json");
        headers = headers.append("Authorization", "Token " + this.token);

        this.http.get(adminURL, { headers: headers }).subscribe(
          async response => {
            if (response) {
              check = response;
              console.log(check);
              if (response == true) this.router.navigate(["admin"]);
            } else {
              return false;
            }
          },
          error => {
            console.log("Not Admin");
          }
        );
        this.router.navigate(["current"]);
      },
      error => {
        console.log(error);
        console.log("No such user exists!");
      }
    );
  }
}
