import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  isAuthenticated = false;

  constructor(protected auth: AuthService) { }

  canActivate(): boolean {
    if (localStorage.getItem("profile"))
      return true;

    return false;
  }

  //canActivate(): boolean {
  //  this.auth.isAuthenticated$.subscribe(
  //    (isAuthenticated) => this.isAuthenticated = isAuthenticated);

  //  if (this.isAuthenticated)
  //    return true;

  //  window.location.href = "vega-cars.eu.auth0.com/login";
  //  return false;
  //}

  //canActivate(): boolean {
  //  this.auth.isAuthenticated$.subscribe(
  //    (isAuthenticated) => {
  //      if (isAuthenticated)
  //        return true;

  //      window.location.href = "vega-cars.eu.auth0.com/login";
  //      return false;
  //    });
  //  return false;
  //}
}
