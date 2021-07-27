import { Injectable } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { AuthGuard } from './auth-guard.service';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuard extends AuthGuard {

  constructor(auth: AuthService) {
    super(auth);
  }

  canActivate(): boolean  {
    var isAuthenticated = super.canActivate();

    //Reads and parses the localStorage data into an object
    var profile = JSON.parse(localStorage.getItem("profile"));

    //Gets the roles from the profile object
    var roles = profile['https://vega.com/roles'];

    return isAuthenticated ? roles.includes("Admin") : false;
  }
}
