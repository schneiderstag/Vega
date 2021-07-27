"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NavMenuComponent = void 0;
var core_1 = require("@angular/core");
var auth0_angular_1 = require("@auth0/auth0-angular");
var notification_service_1 = require("../../services/notification.service");
//import jwt_decode from 'jwt-decode';
var NavMenuComponent = /** @class */ (function () {
    function NavMenuComponent(auth, notificationService) {
        this.auth = auth;
        this.notificationService = notificationService;
        this.isExpanded = false;
        this.isAuthenticated = false;
        this.roles = [];
        this.profileJson = null;
    }
    NavMenuComponent.prototype.ngOnInit = function () {
        this.readUserFromToken();
    };
    NavMenuComponent.prototype.readUserFromToken = function () {
        var _this = this;
        //check if user is authenticated
        this.auth.isAuthenticated$.subscribe(function (isAuthenticated) {
            console.log("Is Authenticated: ", isAuthenticated);
            _this.isAuthenticated = isAuthenticated;
            //get the token if user is authenticated
            if (isAuthenticated) {
                _this.auth.idTokenClaims$.subscribe(function (claims) {
                    //this.user = claims;
                    //this.roles = claims["https://vega.com/roles"]; //get the roles
                    _this.profileJson = JSON.stringify(claims, null, 2); //store token in the local storage
                    localStorage.setItem("profile", _this.profileJson);
                    //console.log("User: ", this.user);
                    //console.log("Roles: ", this.roles);
                    //console.log("Profile Json: ", this.profileJson);
                });
            }
            _this.auth.error$.subscribe(function (error) {
                console.log(error);
                _this.notificationService.showToastr("error", "Error", "Token error: " + error);
            });
        });
    };
    NavMenuComponent.prototype.isInRole = function (roleName) {
        return this.roles.indexOf(roleName) > -1;
    };
    NavMenuComponent.prototype.logout = function () {
        localStorage.removeItem("profile"); //remove profile from localStorage
        this.auth.logout();
    };
    NavMenuComponent.prototype.collapse = function () {
        this.isExpanded = false;
    };
    NavMenuComponent.prototype.toggle = function () {
        this.isExpanded = !this.isExpanded;
    };
    NavMenuComponent = __decorate([
        core_1.Component({
            selector: 'app-nav-menu',
            templateUrl: './nav-menu.component.html',
            styleUrls: ['./nav-menu.component.css']
        }),
        __metadata("design:paramtypes", [auth0_angular_1.AuthService,
            notification_service_1.NotificationService])
    ], NavMenuComponent);
    return NavMenuComponent;
}());
exports.NavMenuComponent = NavMenuComponent;
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
//# sourceMappingURL=nav-menu.component.js.map