import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
//import { HttpClient } from "selenium-webdriver/http";
//import "rxjs/add/operator/map";
//import { JwtHelperService } from "@auth0/angular-jwt";
//import { tokenNotExpired } from "angular2-jwt";
import { JwtHelperService } from "@auth0/angular-jwt";

@Injectable()
export class AuthService {
  //authToken: any;
  authToken = undefined;
  //user: any;
  url = "http://localhost:8000/api/users/login";

  constructor(private http: HttpClient, public jwtHelper: JwtHelperService) {}

  storeToken(token) {
    console.log("Storing...");

    localStorage.setItem("id_token", token);
    this.authToken = token;
  }

  logout() {
    this.authToken = null;
    localStorage.clear();
  }

  loadToken() {
    let token = localStorage.getItem("id_token");
    this.authToken = token;
  }

  loggedIn() {
    /*
    if (this.authToken == "") {
      return false;
    } else {
      console.log(this.authToken);
      console.log("Token is: " + this.jwtHelper.isTokenExpired());
      return this.jwtHelper.isTokenExpired(this.authToken);
    }*/

    this.loadToken();
    if (this.authToken == "" || this.authToken == undefined) {
      //if (this.authToken != localStorage.getItem("id_token")) {
      return false;
    } else {
      return true;
    }

    /*
    let valid = false;
    console.log(valid);

    let token = localStorage.getItem("id_token");
    //console.log(token);

    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append("Content-Type", "application/json");
    headers = headers.append("Authorization", "Token " + token);

    this.http.get(this.url, { headers: headers }).subscribe(
      response => {
        console.log("Successful Auth!");
        valid = true;
      },
      error => {
        console.log("Failed");
        valid = false;
      }
    );

    return valid;*/
  }
}
