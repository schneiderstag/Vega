import { Component, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { NotificationService } from '../../services/notification.service';
//import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent implements OnInit {
  isExpanded = false;
  //profileJson: string = null;
  roles: any;

  constructor(
    private auth: AuthService,
    private notificationService: NotificationService) { }

  ngOnInit(): void {
    //gets the token
    this.auth.idTokenClaims$.subscribe((claims) => console.log("Token: ", claims));
    this.auth.error$.subscribe(
      (error) => {
        console.log(error);
        this.notificationService.showToastr("success", "Success", "Token error: " + error);
      });

    //gets the profile
    //this.auth.user$.subscribe(
      //(profile) => (this.profileJson = JSON.stringify(profile, null, 2))
      //(profile) => {
        //(this.profileJson = JSON.stringify(profile, null, 2)); //If needed, search how to get the token instead of the profile
        ////localStorage.setItem("profile", this.profileJson); //store token in the local storage
        ////localStorage.removeItem("profile"); //If you have a logout method, remove this from localStorage
        //console.log("Token: ", this.profileJson);

        //var jwtHelper = new JwtHelperService();
        //var decodedToken = jwtHelper.decodeToken(this.profileJson); //need to get the token here
        //console.log("Decoded Token: ", decodedToken)
      //});

    // gets the token, but not JWT yet.
    //this.auth.getAccessTokenSilently().subscribe(
    //  token => console.log("getAccessTokenSilently() ", token)
    //);

    //Access the idTokenClaims$ observable on the AuthService instance to retrieve the ID token claims.
    //Like the user$ observable, this observable already heeds the isAuthenticated$ observable, so you do not need to check if the user is authenticated before using it:

    //this.auth.idTokenClaims$.subscribe((claims) => console.log("Token: ", claims));
    //this.auth.idTokenClaims$.subscribe(
    //  (claims) => {
    //    console.log("claims", claims)
        //var jwtHelper = new JwtHelperService();
        //var decodedToken = jwtHelper.decodeToken(claims.__raw); //gets __raw value (JTW token) and decode it.
        //console.log("jtw", decodedToken);
      //});

    //Errors in the login flow can be captured by subscribing to the error$ observable:
    //this.auth.error$.subscribe((error) => console.log(error));
  }

  collapse() {
    this.isExpanded = false;
  }

  toggle() {
    this.isExpanded = !this.isExpanded;
  }
}
