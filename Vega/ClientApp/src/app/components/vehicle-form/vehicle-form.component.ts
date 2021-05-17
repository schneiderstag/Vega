import * as _ from 'underscore';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { SaveVehicle, Vehicle } from '../../models/vehicle';
import { VehicleService } from '../../services/vehicle.service';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'vehicle-form',
  templateUrl: './vehicle-form.component.html',
  styleUrls: ['./vehicle-form.component.css']
})
export class VehicleFormComponent implements OnInit {
  makes: any;
  models: any[];
  features: any;
  vehicle: SaveVehicle = {
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

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private vehicleService: VehicleService,
    private notificationService: NotificationService) {

    route.params.subscribe(p => {
      this.vehicle.id = +p['id'] || 0; // + to convert to a number.
    });
  }

  // ngOnInit(): void {
  //   this.makeService.getMakes().subscribe(makes => {
  //     this.makes = makes
  //     console.log("MAKES", this.makes);
  //   });
  // }
  ngOnInit(): void {
    var sources = [
      this.vehicleService.getMakes(),
      this.vehicleService.getFeatures(),
    ];

    if (this.vehicle.id)
      sources.push(this.vehicleService.getVehicle(this.vehicle.id));

    // Send multiple parallel requests
    forkJoin(sources).subscribe((data: any) => {
      this.makes = data[0];
      this.features = data[1];

      if (this.vehicle.id) {
        this.setVehicle(data[2]);
        this.populateModels();
      } else {
        this.vehicle.id = 0;
      }
    }, err => {
      if (err.status == 404)
        this.router.navigate(['/home']);
    });
  }

  private setVehicle(vehicle: Vehicle) {
    this.vehicle.id = vehicle.id;
    //this.vehicle.id = this.vehicle.id ? this.vehicle.id : 0; //fix error with id = NaN. Find a better solution.
    this.vehicle.makeId = vehicle.make.id;
    this.vehicle.modelId = vehicle.model.id;
    this.vehicle.isRegistered = vehicle.isRegistered;
    this.vehicle.contact = vehicle.contact;
    this.vehicle.features = _.pluck(vehicle.features, 'id');
  }

  onMakeChange() {
    this.populateModels();
    console.log("VEHICLE", this.vehicle);
    delete this.vehicle.modelId;
  }

  private populateModels() {
    var selectedMake = this.makes.find(m => m.id == this.vehicle.makeId);
    //var selectedMake = this.makes.find((m: { id: any; }) => m.id == this.vehicle.make);
    this.models = selectedMake ? selectedMake.models : [];
  }

  onFeatureToggle(featureId, $event) {
    if($event.target.checked)
      this.vehicle.features.push(featureId);
      else {
        var index = this.vehicle.features.indexOf(featureId);
        this.vehicle.features.splice(index, 1);
      }
  }

  submit() {
    var result$ = (this.vehicle.id) ? this.vehicleService.update(this.vehicle) : this.vehicleService.create(this.vehicle);
    result$.subscribe(vehicle => {
      this.notificationService.showToastr("success", "Success", "Vehicle was successfully saved.");
      console.log(vehicle);
      //this.router.navigate(['/vehicles/', vehicle.id]); // fix this
      this.router.navigate(['/vehicles/', this.vehicle.id]);
    });
  }

  delete() {
    if (confirm("Are you sure?")) {
      this.vehicleService.delete(this.vehicle.id)
        .subscribe(x => {
          this.router.navigate(['/home']);
        });
    }
  }
}
