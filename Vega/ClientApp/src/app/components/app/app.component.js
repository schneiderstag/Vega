"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppComponent = void 0;
var core_1 = require("@angular/core");
var AppComponent = /** @class */ (function () {
    function AppComponent() {
        this.title = 'app';
        //Clears local storage when browser is closed
        //You can store your information in session storage which is practically the same as local storage except the data gets cleared when the tab is closed.
        //localStorage for sharing same data of a domain among tabs of same browser.
        //sessionStorage for keeping state of the same tab while reloading.
        //onbeforeunload event to perform actions on tab close.
        //onload event to perform actions on loading data of a tab.
        //@HostListener('window:unload', ['$event'])
        //async unloadHandler(event) {
        //  if (event.currentTarget.performance.navigation.type !== PerformanceNavigation.TYPE_RELOAD) {
        //    localStorage.clear();
        //  }
        //}
    }
    AppComponent = __decorate([
        core_1.Component({
            selector: 'app-root',
            templateUrl: './app.component.html'
        })
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map