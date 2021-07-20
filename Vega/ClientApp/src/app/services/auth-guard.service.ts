import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate{
  isAuthenticated = false;

  constructor(protected auth: AuthService) { }

  canActivate(): boolean {
    if (this.auth.isAuthenticated$)
      return true;

      window.location.href = "vega-cars.eu.auth0.com/login";
      return false;
    }
  }
