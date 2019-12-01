import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { RouterModule, Routes, Route } from "@angular/router";
import { FormsModule } from "@angular/forms";

import { AppComponent } from "./app.component";
import { AppRoutingModule } from "./app-routing.module";
import { DashboardComponent } from "./components/dashboard/dashboard.component";
import { HomeComponent } from "./components/home/home.component";
import { LoginComponent } from "./components/login/login.component";
import { NavbarComponent } from "./components/navbar/navbar.component";
import { RegisterComponent } from "./components/register/register.component";

import { ValidateService } from "./services/validate.service";
import { AuthService } from "./services/auth.service";

import { JwtHelperService } from "@auth0/angular-jwt";
import { JwtModule } from "@auth0/angular-jwt";
import { AuthGuard } from "./guards/auth.guard";
import { AboutComponent } from "./components/about/about.component";
import { ListingComponent } from "./components/listing/listing.component";
import { AdminComponent } from "./components/admin/admin.component";
import { DmcaComponent } from "./components/dmca/dmca.component";
import { AddReviewComponent } from "./components/add-review/add-review.component";
import { AddNoticeComponent } from "./components/add-notice/add-notice.component";
import { DisplayComponent } from "./components/display/display.component";
import { ListUsersComponent } from "./components/list-users/list-users.component";

const appRoutes: Routes = [
  { path: "", component: AboutComponent },
  { path: "home", component: HomeComponent },
  { path: "register", component: RegisterComponent },
  { path: "login", component: LoginComponent },
  { path: "about", component: AboutComponent },
  { path: "admin", component: AdminComponent },
  { path: "dmca", component: DmcaComponent },
  { path: "display", component: DisplayComponent },
  { path: "users", component: ListUsersComponent },
  { path: "listing/:id", component: ListingComponent },
  { path: "current/:id", component: AddReviewComponent },
  { path: "dmca/:id", component: AddNoticeComponent },
  { path: "current", component: DashboardComponent, canActivate: [AuthGuard] }
];

export function tokenGetter() {
  return localStorage.getItem("access_token");
}

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    DashboardComponent,
    AboutComponent,
    ListingComponent,
    AdminComponent,
    DmcaComponent,
    AddReviewComponent,
    AddNoticeComponent,
    DisplayComponent,
    ListUsersComponent
    //JwtHelperService
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule,
    //JwtHelperService,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        whitelistedDomains: [
          "localhost:8000",
          "localhost:8080",
          "localhost:4200",
          "0.0.0.0:8080",
          "0.0.0.0:4200"
        ],
        blacklistedRoutes: ["localhost:4200/api/users/current"]
      }
    })
  ],
  providers: [ValidateService, AuthService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule {}
