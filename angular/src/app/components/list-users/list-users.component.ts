import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";

@Component({
  selector: "app-list-users",
  templateUrl: "./list-users.component.html",
  styleUrls: ["./list-users.component.css"]
})
export class ListUsersComponent implements OnInit {
  list: Object;
  url = "http://localhost:8000/api/users/listUsers";

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit() {
    this.http.get(this.url).subscribe(data => {
      this.list = data;
      console.log(this.list);
    });
  }

  toggleActive(user) {
    console.log(user);

    let upURL = "http://localhost:8000/api/users/active/";

    // Create new Obj which contains the toggled value of isVisible property
    let userObj = {
      isActive: !user.isActive
    };

    console.log(userObj);
    console.log(upURL + user._id);

    this.http.put(upURL + user._id, userObj).subscribe(
      response => {
        console.log(response);
      },
      error => console.log(error)
    );

    console.log(user.isActive);
    //console.log(song);
  }
}
