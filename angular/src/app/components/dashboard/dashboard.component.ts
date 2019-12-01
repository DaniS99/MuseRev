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

  createURL = "http://localhost:8000/api/songs/create";

  // Elements for adding a song from dashboard
  header: String;
  title: String;
  artist: String;
  album: String;
  year: Number;
  comment: String;
  zeroByte: Number;
  track: Number;
  genre: Number;

  //username: String;
  //rating: Number;
  //comment: String;

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
  }

  getYear() {
    var date = new Date();
    console.log(date.getFullYear);
    return date.getFullYear();
  }

  onSong() {
    let holdRes;

    if (!this.title || !this.artist) {
      console.log("Please enter title and artist fields");
      return;
    }

    const newSong = {
      header: this.header,
      title: this.title,
      artist: this.artist,
      album: this.album,
      year: this.year,
      comment: this.comment,
      zeroByte: this.zeroByte,
      track: this.track,
      genre: this.genre
    };

    this.http.post(this.createURL, newSong).subscribe(
      response => {
        holdRes = response;
        console.log(holdRes._id);

        this.router.navigate(["current/" + holdRes._id]);
      },
      error => console.log(error)
    );

    console.log("Added Song!");

    //
  }
}
