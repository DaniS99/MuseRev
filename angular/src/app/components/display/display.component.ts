import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";

@Component({
  selector: "app-display",
  templateUrl: "./display.component.html",
  styleUrls: ["./display.component.css"]
})
export class DisplayComponent implements OnInit {
  list: Object;
  url = "http://localhost:8000/api/songs/list";

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit() {
    this.http.get(this.url).subscribe(data => {
      this.list = data;
      console.log(this.list);
    });
  }

  toggleVisibility(song) {
    //console.log(song);

    let upURL = "http://localhost:8000/api/songs/visibility/";

    // Create new Obj which contains the toggled value of isVisible property
    let songObj = {
      isVisible: !song.isVisible
    };

    //console.log(songObj);

    this.http.put(upURL + song._id, songObj).subscribe(
      response => {
        console.log(response);
      },
      error => console.log(error)
    );

    console.log(song.isVisible);
    //console.log(song);
  }
}
