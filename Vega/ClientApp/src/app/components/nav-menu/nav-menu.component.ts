import { Component, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { profile } from 'console';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent implements OnInit {
  isExpanded = false;
  profileJson: string = null;

  constructor(private auth: AuthService) {}

  ngOnInit(): void {
    //gets the token
    this.auth.user$.subscribe(
      //(profile) => (this.profileJson = JSON.stringify(profile, null, 2))
      (profile) => {
        (this.profileJson = JSON.stringify(profile, null, 2));
        console.log("Token: ", this.profileJson);
      });
  }

  collapse() {
    this.isExpanded = false;
  }

  toggle() {
    this.isExpanded = !this.isExpanded;
  }
}
