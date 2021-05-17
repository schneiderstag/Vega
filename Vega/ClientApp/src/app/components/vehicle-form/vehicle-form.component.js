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
exports.VehicleFormComponent = void 0;
var _ = require("underscore");
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var rxjs_1 = require("rxjs");
var vehicle_service_1 = require("../../services/vehicle.service");
var notification_service_1 = require("../../services/notification.service");
var VehicleFormComponent = /** @class */ (function () {
    function VehicleFormComponent(route, router, vehicleService, notificationService) {
        var _this = this;
        this.route = route;
        this.router = router;
        this.vehicleService = vehicleService;
        this.notificationService = notificationService;
        this.vehicle = {
            id: 0,
            makeId: 0,
            modelId: 0,
            isRegistered: false,
            features: [],
            contact: {
                name: '',
                email: '',
                phone: ''
            }
        };
        route.params.subscribe(function (p) {
            _this.vehicle.id = +p['id'] || 0; // + to convert to a number.
        });
    }
    // ngOnInit(): void {
    //   this.makeService.getMakes().subscribe(makes => {
    //     this.makes = makes
    //     console.log("MAKES", this.makes);
    //   });
    // }
    VehicleFormComponent.prototype.ngOnInit = function () {
        var _this = this;
        var sources = [
            this.vehicleService.getMakes(),
            this.vehicleService.getFeatures(),
        ];
        if (this.vehicle.id)
            sources.push(this.vehicleService.getVehicle(this.vehicle.id));
        // Send multiple parallel requests
        rxjs_1.forkJoin(sources).subscribe(function (data) {
            _this.makes = data[0];
            _this.features = data[1];
            if (_this.vehicle.id) {
                _this.setVehicle(data[2]);
                _this.populateModels();
            }
            else {
                _this.vehicle.id = 0;
            }
        }, function (err) {
            if (err.status == 404)
                _this.router.navigate(['/home']);
        });
    };
    VehicleFormComponent.prototype.setVehicle = function (vehicle) {
        this.vehicle.id = vehicle.id;
        //this.vehicle.id = this.vehicle.id ? this.vehicle.id : 0; //fix error with id = NaN. Find a better solution.
        this.vehicle.makeId = vehicle.make.id;
        this.vehicle.modelId = vehicle.model.id;
        this.vehicle.isRegistered = vehicle.isRegistered;
        this.vehicle.contact = vehicle.contact;
        this.vehicle.features = _.pluck(vehicle.features, 'id');
    };
    VehicleFormComponent.prototype.onMakeChange = function () {
        this.populateModels();
        console.log("VEHICLE", this.vehicle);
        delete this.vehicle.modelId;
    };
    VehicleFormComponent.prototype.populateModels = function () {
        var _this = this;
        var selectedMake = this.makes.find(function (m) { return m.id == _this.vehicle.makeId; });
        //var selectedMake = this.makes.find((m: { id: any; }) => m.id == this.vehicle.make);
        this.models = selectedMake ? selectedMake.models : [];
    };
    VehicleFormComponent.prototype.onFeatureToggle = function (featureId, $event) {
        if ($event.target.checked)
            this.vehicle.features.push(featureId);
        else {
            var index = this.vehicle.features.indexOf(featureId);
            this.vehicle.features.splice(index, 1);
        }
    };
    VehicleFormComponent.prototype.submit = function () {
        var _this = this;
        var result$ = (this.vehicle.id) ? this.vehicleService.update(this.vehicle) : this.vehicleService.create(this.vehicle);
        result$.subscribe(function (vehicle) {
            _this.notificationService.showToastr("success", "Success", "Vehicle was successfully saved.");
            console.log(vehicle);
            //this.router.navigate(['/vehicles/', vehicle.id]); // fix this
            _this.router.navigate(['/vehicles/', _this.vehicle.id]);
        });
    };
    VehicleFormComponent.prototype.delete = function () {
        var _this = this;
        if (confirm("Are you sure?")) {
            this.vehicleService.delete(this.vehicle.id)
                .subscribe(function (x) {
                _this.router.navigate(['/home']);
            });
        }
    };
    VehicleFormComponent = __decorate([
        core_1.Component({
            selector: 'vehicle-form',
            templateUrl: './vehicle-form.component.html',
            styleUrls: ['./vehicle-form.component.css']
        }),
        __metadata("design:paramtypes", [router_1.ActivatedRoute,
            router_1.Router,
            vehicle_service_1.VehicleService,
            notification_service_1.NotificationService])
    ], VehicleFormComponent);
    return VehicleFormComponent;
}());
exports.VehicleFormComponent = VehicleFormComponent;
//# sourceMappingURL=vehicle-form.component.js.map