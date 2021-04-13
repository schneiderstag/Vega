import { Component, KeyValueDiffers, OnInit } from '@angular/core';
import { KeyValuePair, Vehicle } from '../../models/vehicle';
import { VehicleService } from '../../services/vehicle.service';

@Component({
  selector: 'app-vehicle-list',
  templateUrl: './vehicle-list.component.html',
  styleUrls: ['./vehicle-list.component.css']
})
export class VehicleListComponent implements OnInit {
  vehicles: Vehicle[];
  //allVehicles: Vehicle[];
  makes: KeyValuePair[];
  models: KeyValuePair[];
  filter: any = {};

  constructor(private vehicleService: VehicleService) { }

  ngOnInit(): void {
    this.vehicleService.getMakes()
      .subscribe((makes: KeyValuePair[]) => this.makes = makes); // (makes: KeyValuePair[]) converts from Object to KeyValuePair

    this.vehicleService.getModels()
      .subscribe((models: KeyValuePair[]) => this.models = models);

    //this.vehicleService.getVehicles(this.filter)
    //  .subscribe((vehicles: Vehicle[]) => this.vehicles = this.allVehicles = vehicles);

    this.populateVehicles();
  }

  populateVehicles() {
    this.vehicleService.getVehicles(this.filter)
      .subscribe((vehicles: Vehicle[]) => this.vehicles = vehicles);
  }

  //populateVehicles() {
  //  this.vehicleService.getVehicles(this.filter)
  //    .subscribe((vehicles: Vehicle[]) => {
  //      this.vehicles = vehicles;
  //      this.models = vehicles.map(v => v.model); // maps all models in the vehicle list to a new list of models.
  //    });
  //}

  onFilterChange() {
    this.populateVehicles();
    //var vehicles = this.allVehicles;

    //if (this.filter.makeId)
    //  vehicles = vehicles.filter(v => v.make.id == this.filter.makeId);

    //if (this.filter.modelId)
    //  vehicles = vehicles.filter(v => v.model.id == this.filter.modelId);

    //this.vehicles = vehicles;
  }
}
