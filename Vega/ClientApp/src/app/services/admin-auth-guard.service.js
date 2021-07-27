"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
exports.AdminAuthGuard = void 0;
var core_1 = require("@angular/core");
var auth0_angular_1 = require("@auth0/auth0-angular");
var auth_guard_service_1 = require("./auth-guard.service");
var AdminAuthGuard = /** @class */ (function (_super) {
    __extends(AdminAuthGuard, _super);
    function AdminAuthGuard(auth) {
        return _super.call(this, auth) || this;
    }
    AdminAuthGuard.prototype.canActivate = function () {
        var isAuthenticated = _super.prototype.canActivate.call(this);
        //Reads and parses the localStorage data into an object
        var profile = JSON.parse(localStorage.getItem("profile"));
        //Gets the roles from the profile object
        var roles = profile['https://vega.com/roles'];
        return isAuthenticated ? roles.includes("Admin") : false;
    };
    AdminAuthGuard = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [auth0_angular_1.AuthService])
    ], AdminAuthGuard);
    return AdminAuthGuard;
}(auth_guard_service_1.AuthGuard));
exports.AdminAuthGuard = AdminAuthGuard;
//# sourceMappingURL=admin-auth-guard.service.js.map