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
exports.VehicleListComponent = void 0;
var core_1 = require("@angular/core");
var vehicle_service_1 = require("../../services/vehicle.service");
var photo_service_1 = require("../../services/photo.service");
var VehicleListComponent = /** @class */ (function () {
    function VehicleListComponent(vehicleService, photoService) {
        this.vehicleService = vehicleService;
        this.photoService = photoService;
        this.PAGE_SIZE = 10;
        this.queryResult = {};
        this.query = {
            pageSize: this.PAGE_SIZE
        };
        this.columns = [
            { title: 'Id' },
            { title: 'Contact Name', key: 'contactName', isSortable: true },
            { title: 'Make', key: 'make', isSortable: true },
            { title: 'Model', key: 'model', isSortable: true },
            { title: 'Thumbnail', key: 'thumbnail', isSortable: false },
            {}
        ];
    }
    VehicleListComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.vehicleService.getMakes()
            .subscribe(function (makes) { return _this.makes = makes; }); // (makes: KeyValuePair[]) converts from Object to KeyValuePair
        this.vehicleService.getModels()
            .subscribe(function (models) { return _this.models = models; });
        this.photoService.getPhotos()
            .subscribe(function (photos) {
            _this.photos = photos;
            console.log("getPhotos() test", _this.photos);
        });
        //this.vehicleService.getVehicles(this.query)
        //  .subscribe((vehicles: Vehicle[]) => this.vehicles = this.allVehicles = vehicles);
        this.populateVehicles();
    };
    //private populateVehicles() {
    //  this.vehicleService.getVehicles(this.query)
    //    .subscribe((result: any) => this.queryResult = result);
    //}
    VehicleListComponent.prototype.populateVehicles = function () {
        var _this = this;
        this.vehicleService.getVehicles(this.query)
            .subscribe(function (result) {
            _this.queryResult = result;
            //this.queryResult.items.forEach(item => {
            //  this.photoService.getVehiclePhotos(item.id)
            //    .subscribe((p: any[]) => {
            //      item.fileName = p.length > 0 ? p[0].fileName : '';
            //      console.log(item.fileName);
            //      console.log(this.queryResult);
            //    });
            //})
            _this.queryResult.items.forEach(function (item) {
                for (var _i = 0, _a = _this.photos; _i < _a.length; _i++) {
                    var photo = _a[_i];
                    if (photo.vehicleId == item.id) {
                        item.fileName = photo.fileName;
                    }
                    else
                        '';
                }
            });
            console.log(_this.queryResult);
            //this.queryResult.items.forEach(item => {
            //  item.fileName = this.photos.length > 0 ? this.photos.filter(photo => { if (photo.vehicleId == item.id) return photo.fileName }) : '';
            //})
            //this.queryResult.items.forEach(item => {
            //  item.fileName = this.photos.length > 0 ? this.photos.forEach(photo =>
            //  {
            //    this.photos.filter(photo => {
            //      if (photo.vehicleId == item.id) return photo.fileName
            //    })
            //  }) : '';
            //item.fileName = photos.length > 0 ? photos[0].fileName : '';
            //console.log(item.fileName);
            //})
        });
    };
    //populateVehicles() {
    //  this.vehicleService.getVehicles(this.query)
    //    .subscribe((vehicles: Vehicle[]) => {
    //      this.vehicles = vehicles;
    //      this.models = vehicles.map(v => v.model); // maps all models in the vehicle list to a new list of models.
    //    });
    //}
    //getPhotos() {
    //  for (let v of this.queryResult) {
    //    this.photoService.getPhotos(v.id)
    //      .subscribe((photo: any) => v.photo = photo);
    //  }
    VehicleListComponent.prototype.onFilterChange = function () {
        this.query.page = 1;
        this.populateVehicles();
        //var vehicles = this.allVehicles;
        //if (this.query.makeId)
        //  vehicles = vehicles.query(v => v.make.id == this.query.makeId);
        //if (this.query.modelId)
        //  vehicles = vehicles.query(v => v.model.id == this.query.modelId);
        //this.vehicles = vehicles;
    };
    VehicleListComponent.prototype.resetFilter = function () {
        this.query = {
            page: 1,
            pageSize: this.PAGE_SIZE
        };
        this.populateVehicles();
    };
    VehicleListComponent.prototype.sortBy = function (columnName) {
        if (this.query.sortBy === columnName) {
            this.query.isSortAscending = !this.query.isSortAscending;
        }
        else {
            this.query.sortBy = columnName;
            this.query.isSortAscending = true;
        }
        this.populateVehicles();
    };
    VehicleListComponent.prototype.onPageChange = function (page) {
        this.query.page = page;
        this.populateVehicles();
    };
    VehicleListComponent = __decorate([
        core_1.Component({
            selector: 'vehicle-list',
            templateUrl: './vehicle-list.component.html',
            styleUrls: ['./vehicle-list.component.css']
        }),
        __metadata("design:paramtypes", [vehicle_service_1.VehicleService,
            photo_service_1.PhotoService])
    ], VehicleListComponent);
    return VehicleListComponent;
}());
exports.VehicleListComponent = VehicleListComponent;
//# sourceMappingURL=vehicle-list.component.js.map