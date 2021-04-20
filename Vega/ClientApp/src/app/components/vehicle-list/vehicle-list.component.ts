import { Component, KeyValueDiffers, OnInit } from '@angular/core';
import { KeyValuePair, Vehicle } from '../../models/vehicle';
import { VehicleService } from '../../services/vehicle.service';

@Component({
  selector: 'app-vehicle-list',
  templateUrl: './vehicle-list.component.html',
  styleUrls: ['./vehicle-list.component.css']
})
export class VehicleListComponent implements OnInit {
  private readonly PAGE_SIZE = 3;

  queryResult: any = {};
  //allVehicles: Vehicle[];
  makes: KeyValuePair[];
  models: KeyValuePair[];
  query: any = {
    pageSize: this.PAGE_SIZE
  };
  columns = [
    { title: 'Id' },
    { title: 'Contact Name', key: 'contactName', isSortable: true },
    { title: 'Make', key: 'make', isSortable: true },
    { title: 'Model', key: 'model', isSortable: true },
    { }
  ];

  constructor(private vehicleService: VehicleService) { }

  ngOnInit(): void {
    this.vehicleService.getMakes()
      .subscribe((makes: KeyValuePair[]) => this.makes = makes); // (makes: KeyValuePair[]) converts from Object to KeyValuePair

    this.vehicleService.getModels()
      .subscribe((models: KeyValuePair[]) => this.models = models);

    //this.vehicleService.getVehicles(this.query)
    //  .subscribe((vehicles: Vehicle[]) => this.vehicles = this.allVehicles = vehicles);

    this.populateVehicles();
  }

  private populateVehicles() {
    this.vehicleService.getVehicles(this.query)
      .subscribe((result: any) => this.queryResult = result);
  }

  //populateVehicles() {
  //  this.vehicleService.getVehicles(this.query)
  //    .subscribe((vehicles: Vehicle[]) => {
  //      this.vehicles = vehicles;
  //      this.models = vehicles.map(v => v.model); // maps all models in the vehicle list to a new list of models.
  //    });
  //}

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
