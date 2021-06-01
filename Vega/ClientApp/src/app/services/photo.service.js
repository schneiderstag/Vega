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
exports.PhotoService = void 0;
var core_1 = require("@angular/core");
var http_1 = require("@angular/common/http");
var PhotoService = /** @class */ (function () {
    function PhotoService(http) {
        this.http = http;
    }
    PhotoService.prototype.upload = function (vehicleId, photo) {
        var formData = new FormData();
        formData.append('file', photo); //photo is coming as file: IFormFile parameter in PhotosController.Upload()
        return this.http.post("/api/vehicles/" + vehicleId + "/photos", formData);
    };
    PhotoService.prototype.getVehiclePhotos = function (vehicleId) {
        return this.http.get("/api/vehicles/" + vehicleId + "/photos");
    };
    PhotoService.prototype.getPhotos = function () {
        return this.http.get('/api/photos');
    };
    PhotoService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [http_1.HttpClient])
    ], PhotoService);
    return PhotoService;
}());
exports.PhotoService = PhotoService;
//# sourceMappingURL=photo.service.js.map