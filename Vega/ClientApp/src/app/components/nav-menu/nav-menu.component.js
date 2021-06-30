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
var NavMenuComponent = /** @class */ (function () {
    function NavMenuComponent(auth) {
        this.auth = auth;
        this.isExpanded = false;
        this.profileJson = null;
    }
    NavMenuComponent.prototype.ngOnInit = function () {
        var _this = this;
        //gets the profile
        this.auth.user$.subscribe(
        //(profile) => (this.profileJson = JSON.stringify(profile, null, 2))
        function (profile) {
            (_this.profileJson = JSON.stringify(profile, null, 2)); //If needed, search how to get the token instead of the profile
            //localStorage.setItem("profile", this.profileJson); //store token in the local storage
            //localStorage.removeItem("profile"); //If you have a logout method, remove this from localStorage
            console.log("Token: ", _this.profileJson);
            //var jwtHelper = new JwtHelperService();
            //var decodedToken = jwtHelper.decodeToken(this.profileJson); //need to get the token here
            //console.log("Decoded Token: ", decodedToken)
        });
        // gets the token, but not JWT yet.
        this.auth.getAccessTokenSilently().subscribe(function (token) { return console.log("getAccessTokenSilently() ", token); });
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
        __metadata("design:paramtypes", [auth0_angular_1.AuthService])
    ], NavMenuComponent);
    return NavMenuComponent;
}());
exports.NavMenuComponent = NavMenuComponent;
//# sourceMappingURL=nav-menu.component.js.map