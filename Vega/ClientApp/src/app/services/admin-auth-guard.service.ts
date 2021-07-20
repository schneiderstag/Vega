import { Injectable } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { AuthGuardService } from './auth-guard.service';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuardService extends AuthGuardService {

  constructor(auth: AuthService) {
    super(auth);
  }

  canActivate(): boolean  {
    var isAuthenticated = super.canActivate();

    return isAuthenticated ? this.auth.isInRole('Admin'): false;
  }
}
