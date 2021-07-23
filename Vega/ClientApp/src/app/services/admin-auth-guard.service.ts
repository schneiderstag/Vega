import { Injectable } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { AuthGuard } from './auth-guard.service';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuard extends AuthGuard {

  constructor(authentication: AuthenticationService) { //auth: AuthService, 
    super(authentication);
  }

  canActivate(): boolean  {
    var isAuthenticated = super.canActivate();

    return isAuthenticated ? this.authentication.isInRole('Admin'): false;
  }
}
