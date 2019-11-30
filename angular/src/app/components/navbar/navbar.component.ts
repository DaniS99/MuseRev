import { Component, OnInit } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { AuthService } from "../../services/auth.service";
import { Router } from "@angular/router";
import { ActivatedRoute } from "@angular/router";
import { async } from "q";

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.css"]
})
export class NavbarComponent implements OnInit {
  url = "http://localhost:8000/api/songs/find";
  search: String;
  getIDObj: Object;

  constructor(
    private authService: AuthService,
    private router: Router,
    private http: HttpClient,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {}

  onLogoutClick() {
    this.authService.logout();
    console.log("Logged Out!");
    this.router.navigate(["/login"]);
    return false;
  }

  onEnter() {
    let search = this.search;
    console.log(search);
    // let query = this.route.snapshot.queryParams.search;
    //console.log(query);

    let queryObj = {
      query: search
    };

    this.http.post(this.url, queryObj).subscribe(
      (response: any) => {
        //console.log(response["0"]._id);
        this.router.navigate(["current/" + response["0"]._id]);
      },
      error => console.log(error)
    );

    console.log("Searching for something?");
  }
}
