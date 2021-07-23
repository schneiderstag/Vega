import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate{
  isAuthenticated = false;

  constructor(protected authentication: AuthenticationService) { } //protected auth: AuthService, 

  canActivate(): boolean {
    if (this.authentication.isAuthenticated)
      return true;

      window.location.href = "vega-cars.eu.auth0.com/login";
      return false;
    }
  }
