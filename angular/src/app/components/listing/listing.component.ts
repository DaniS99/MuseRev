import { Component, OnInit, Input } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-listing",
  templateUrl: "./listing.component.html",
  styleUrls: ["./listing.component.css"]
})
export class ListingComponent implements OnInit {
  @Input("song") song: any; // Bind property from upper component app-home
  @Input("songDataPassed") songDataPassed: any;

  songData: Object;
  url = "http://localhost:8000/api/songs/"; // Missing :id field

  constructor(private http: HttpClient, private route: ActivatedRoute) {}

  ngOnInit() {
    //console.log(this.url);
    let idURL = this.route.snapshot.params["id"]; // Gets object id from link

    this.http.get(this.url + idURL).subscribe(data => {
      this.songData = data;
    });
  }

  renderSong() {
    console.log("Song Listing!");
  }
}
