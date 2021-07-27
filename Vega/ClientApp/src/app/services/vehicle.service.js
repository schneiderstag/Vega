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
exports.VehicleService = void 0;
var core_1 = require("@angular/core");
var http_1 = require("@angular/common/http");
var VehicleService = /** @class */ (function () {
    function VehicleService(http) {
        this.http = http;
        this.vehiclesEndpoint = '/api/vehicles';
    }
    // By default the HttpClient deserializes the content of a response into an object.
    // Some of its methods allow passing a generic type argument in order to duck - type the result.
    // Thats why there is no json() method anymore.
    // return this.http.get('api/makes').pipe(map(res => res.json()));
    VehicleService.prototype.getMakes = function () {
        return this.http.get('/api/makes');
    };
    VehicleService.prototype.getModels = function () {
        return this.http.get('/api/models');
    };
    VehicleService.prototype.getFeatures = function () {
        return this.http.get('/api/features');
    };
    VehicleService.prototype.create = function (vehicle) {
        return this.http.post(this.vehiclesEndpoint + '/', vehicle);
    };
    VehicleService.prototype.update = function (vehicle) {
        return this.http.put(this.vehiclesEndpoint + '/' + vehicle.id, vehicle);
    };
    VehicleService.prototype.getVehicle = function (id) {
        return this.http.get(this.vehiclesEndpoint + '/' + id);
    };
    VehicleService.prototype.getVehicles = function (filter) {
        return this.http.get(this.vehiclesEndpoint + '?' + this.toQueryString(filter));
    };
    VehicleService.prototype.delete = function (id) {
        return this.http.delete(this.vehiclesEndpoint + '/' + id);
    };
    VehicleService.prototype.toQueryString = function (obj) {
        var parts = [];
        for (var property in obj) {
            var value = obj[property];
            if (value != null && value != undefined)
                parts.push(encodeURIComponent(property) + '=' + encodeURIComponent(value));
        }
        return parts.join('&');
    };
    VehicleService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [http_1.HttpClient])
    ], VehicleService);
    return VehicleService;
}());
exports.VehicleService = VehicleService;
//# sourceMappingURL=vehicle.service.js.map