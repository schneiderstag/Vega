import { Component, KeyValueDiffers, OnInit } from '@angular/core';
import { KeyValuePair, Vehicle } from '../../models/vehicle';
import { VehicleService } from '../../services/vehicle.service';

import { PhotoService } from '../../services/photo.service';

@Component({
  selector: 'vehicle-list',
  templateUrl: './vehicle-list.component.html',
  styleUrls: ['./vehicle-list.component.css']
})
export class VehicleListComponent implements OnInit {
  private readonly PAGE_SIZE = 10;

  queryResult: any = {};
  allVehicles: Vehicle[];
  makes: KeyValuePair[];
  models: KeyValuePair[];
  photos: any[];
  query: any = {
    pageSize: this.PAGE_SIZE
  };
  columns = [
    { title: 'Id' },
    { title: 'Contact Name', key: 'contactName', isSortable: true },
    { title: 'Make', key: 'make', isSortable: true },
    { title: 'Model', key: 'model', isSortable: true },
    { title: 'Thumbnail', key: 'thumbnail', isSortable: false },
    { }
  ];

  constructor(private vehicleService: VehicleService,
              private photoService: PhotoService
              ) { }

  ngOnInit(): void {
    this.vehicleService.getMakes()
      .subscribe((makes: KeyValuePair[]) => this.makes = makes); // (makes: KeyValuePair[]) converts from Object to KeyValuePair

    this.vehicleService.getModels()
      .subscribe((models: KeyValuePair[]) => this.models = models);

    this.photoService.getPhotos()
      .subscribe((photos: any[]) => {
        this.photos = photos;
        console.log("getPhotos() test");
        console.log(this.photos);
      });

    //this.vehicleService.getVehicles(this.query)
    //  .subscribe((vehicles: Vehicle[]) => this.vehicles = this.allVehicles = vehicles);

    this.populateVehicles();
  }

  //private populateVehicles() {
  //  this.vehicleService.getVehicles(this.query)
  //    .subscribe((result: any) => this.queryResult = result);
  //}

  private populateVehicles() {
    this.vehicleService.getVehicles(this.query)
      .subscribe((result: any) => {
        this.queryResult = result;

        //this.queryResult.items.forEach(item => {
        //  this.photoService.getVehiclePhotos(item.id)
        //    .subscribe((p: any[]) => {
        //      item.fileName = p.length > 0 ? p[0].fileName : '';
        //      console.log(item.fileName);
        //      console.log(this.queryResult);
        //    });
        //})

        this.queryResult.items.forEach(item => {
          for (let photo of this.photos) {
            if (photo.vehicleId == item.id) {
              item.fileName = photo.fileName;
            } else
              '';
          }
        })

        console.log(this.queryResult);

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
  }

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

  onFilterChange() {
    this.query.page = 1;
    this.populateVehicles();
    //var vehicles = this.allVehicles;

    //if (this.query.makeId)
    //  vehicles = vehicles.query(v => v.make.id == this.query.makeId);

    //if (this.query.modelId)
    //  vehicles = vehicles.query(v => v.model.id == this.query.modelId);

    //this.vehicles = vehicles;
  }

  resetFilter() {
    this.query = {
      page: 1,
      pageSize: this.PAGE_SIZE
      };
    this.populateVehicles();
  }

  sortBy(columnName) {
    if (this.query.sortBy === columnName) {
      this.query.isSortAscending = !this.query.isSortAscending;
    } else {
      this.query.sortBy = columnName;
      this.query.isSortAscending = true;
    }
    this.populateVehicles();
  }

  onPageChange(page) {
    this.query.page = page;
    this.populateVehicles();
  }
}
