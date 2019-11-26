import { Component, OnInit } from "@angular/core";
import { ValidateService } from "../../services/validate.service";
import { AuthService } from "../../services/auth.service";
import { Router } from "@angular/router";
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.css"]
})
export class RegisterComponent implements OnInit {
  email: String;
  password: String;

  constructor(
    private validate: ValidateService,
    private authService: AuthService,
    private router: Router,
    private http: HttpClient
  ) {}

  ngOnInit() {}

  onSignUp() {
    let url = "http://localhost:8000/api/users";

    //this.user.email = this.email;
    const fillUser = {
      user: {
        email: this.email,
        password: this.password
      }
    };
    console.log("Signed Up!");

    // Validate for email
    if (!this.validate.validateEmail(fillUser.user.email)) {
      console.log("Bad email");
      return false;
    }

    this.http.post(url, fillUser).subscribe(
      response => {
        console.log(response);
        this.router.navigate(["login"]);
      },
      error => console.log(error)
    );
  }
}