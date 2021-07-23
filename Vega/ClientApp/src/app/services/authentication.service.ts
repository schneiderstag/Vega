import { Injectable } from '@angular/core';
import { OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { NotificationService } from './notification.service';
//import { JwtHelperService } from '@auth0/angular-jwt';
//import jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService implements OnInit {
  private authenticated = false;
  private roles: string[] = [];
  private user: any;
  //profileJson: string = null;

  ngOnInit(): void {
    this.readUserFromToken();
  }

  constructor(
    private auth: AuthService,
    private notificationService: NotificationService) { }

  private readUserFromToken(): void {
    //checks if user is authenticated
    this.auth.isAuthenticated$.subscribe(
      (authenticated) => {
        this.authenticated = authenticated;
        console.log("Is Authenticated: ", authenticated);

        //gets token if user is authenticated
        if (authenticated) {
          this.auth.idTokenClaims$.subscribe(
            (claims) => {
              this.user = claims;
              this.roles = claims["https://vega.com/roles"]; //get roles
              console.log("User: ", this.user);
              console.log("Roles: ", this.roles);
            });
        }

        this.auth.error$.subscribe(
          (error) => {
            console.log(error);
            this.notificationService.showToastr("error", "Error", "Token error: " + error);
          });
      });
  }

  public isAuthenticated() {
    return this.authenticated;
  }

  public isInRole(roleName) {
    return this.roles.indexOf(roleName) > -1;
  }

  public getUser() {
    return this.user;
  }

  public loginWithRedirect() {
    this.auth.loginWithRedirect();
  }

  public logout() {
    this.auth.logout();
  }
}

//gets the token
  //this.auth.idTokenClaims$.subscribe((claims) => console.log("Token: ", claims));

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
      //this.roles = decodedToken['https://vega.com/roles'];
      //console.log("jtw", decodedToken);
    //});

  //Errors in the login flow can be captured by subscribing to the error$ observable:
  //this.auth.error$.subscribe((error) => console.log(error));
