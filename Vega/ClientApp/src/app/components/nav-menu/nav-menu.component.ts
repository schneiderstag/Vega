import { Component, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent implements OnInit {
  isExpanded = false;
  profileJson: string = null;
  roles: any;

  constructor(private auth: AuthService) {}

  ngOnInit(): void {
    //gets the profile
    this.auth.user$.subscribe(
      //(profile) => (this.profileJson = JSON.stringify(profile, null, 2))
      (profile) => {
        (this.profileJson = JSON.stringify(profile, null, 2)); //If needed, search how to get the token instead of the profile
        //localStorage.setItem("profile", this.profileJson); //store token in the local storage
        //localStorage.removeItem("profile"); //If you have a logout method, remove this from localStorage
        console.log("Token: ", this.profileJson);

        //var jwtHelper = new JwtHelperService();
        //var decodedToken = jwtHelper.decodeToken(this.profileJson); //need to get the token here
        //console.log("Decoded Token: ", decodedToken)
      });

    // gets the token, but not JWT yet.
    this.auth.getAccessTokenSilently().subscribe(
      token => console.log("getAccessTokenSilently() ", token)
    );
  }

  collapse() {
    this.isExpanded = false;
  }

  toggle() {
    this.isExpanded = !this.isExpanded;
  }
}
