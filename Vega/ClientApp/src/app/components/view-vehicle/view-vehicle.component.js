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
exports.ViewVehicleComponent = void 0;
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var notification_service_1 = require("../../services/notification.service");
var vehicle_service_1 = require("../../services/vehicle.service");
var photo_service_1 = require("../../services/photo.service");
var progress_service_1 = require("../../services/progress.service");
var ViewVehicleComponent = /** @class */ (function () {
    function ViewVehicleComponent(zone, route, router, notificationService, progressService, photoService, vehicleService) {
        var _this = this;
        this.zone = zone;
        this.route = route;
        this.router = router;
        this.notificationService = notificationService;
        this.progressService = progressService;
        this.photoService = photoService;
        this.vehicleService = vehicleService;
        route.params.subscribe(function (p) {
            _this.vehicleId = +p['id'];
            if (isNaN(_this.vehicleId) || _this.vehicleId <= 0) {
                router.navigate(['/vehicles']);
                return;
            }
        });
    }
    ViewVehicleComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.photoService.getPhotos(this.vehicleId)
            .subscribe(function (photos) { return _this.photos = photos; });
        this.vehicleService.getVehicle(this.vehicleId)
            .subscribe(function (v) { return _this.vehicle = v; }, function (err) {
            if (err.status == 404) {
                _this.router.navigate(['/vehicles']);
                return;
            }
        });
    };
    ViewVehicleComponent.prototype.delete = function () {
        var _this = this;
        if (confirm("Are you sure?")) {
            this.vehicleService.delete(this.vehicle.id)
                .subscribe(function (x) {
                _this.router.navigate(['/vehicles']);
            });
        }
    };
    ViewVehicleComponent.prototype.uploadPhoto = function () {
        var _this = this;
        this.progressService.startTracking()
            .subscribe(function (progress) {
            console.log(progress);
            _this.zone.run(function () {
                _this.progress = progress;
            });
        }, null, function () { _this.progress = null; });
        var nativeElement = this.fileInput.nativeElement;
        var file = nativeElement.files[0];
        nativeElement.value = '';
        this.photoService.upload(this.vehicleId, file)
            .subscribe(function (photo) {
            _this.photos.push(photo);
            console.log(photo);
        }, function (err) {
            _this.notificationService.showToastr("error", "Error", "Photo upload failed: " + err.text());
        });
    };
    __decorate([
        core_1.ViewChild('fileInput'),
        __metadata("design:type", core_1.ElementRef)
    ], ViewVehicleComponent.prototype, "fileInput", void 0);
    ViewVehicleComponent = __decorate([
        core_1.Component({
            selector: 'view-vehicle',
            templateUrl: './view-vehicle.component.html',
            styleUrls: ['./view-vehicle.component.css']
        }),
        __metadata("design:paramtypes", [core_1.NgZone,
            router_1.ActivatedRoute,
            router_1.Router,
            notification_service_1.NotificationService,
            progress_service_1.ProgressService,
            photo_service_1.PhotoService,
            vehicle_service_1.VehicleService])
    ], ViewVehicleComponent);
    return ViewVehicleComponent;
}());
exports.ViewVehicleComponent = ViewVehicleComponent;
//# sourceMappingURL=view-vehicle.component.js.map