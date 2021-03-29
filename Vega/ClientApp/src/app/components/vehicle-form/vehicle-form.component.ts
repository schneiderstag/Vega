import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { VehicleService } from '../../services/vehicle.service';
//import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-vehicle-form',
  templateUrl: './vehicle-form.component.html',
  styleUrls: ['./vehicle-form.component.css']
})
export class VehicleFormComponent implements OnInit {
  makes: any;
  models: any[];
  features: any;
  vehicle: any = {
    features: [],
    contact: {}
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private vehicleService: VehicleService) {

    route.params.subscribe(p => {
      this.vehicle.id = +p['id']; // + to convert to a number.
    });
  }

  // ngOnInit(): void {
  //   this.makeService.getMakes().subscribe(makes => {
  //     this.makes = makes
  //     console.log("MAKES", this.makes);
  //   });
  // }
  ngOnInit(): void {
    this.vehicleService.getVehicle(this.vehicle.id)
      .subscribe(v => {
        this.vehicle = v;
      }, err => {
        if (err.status == 404)
          this.router.navigate(['/home']);
      });

    this.vehicleService.getMakes().subscribe(makes => 
      this.makes = makes);

    this.vehicleService.getFeatures().subscribe(features =>
      this.features = features)
  }

  onMakeChange() {
    console.log("VEHICLE", this.vehicle);
    var selectedMake = this.makes.find(m => m.id == this.vehicle.makeId);
    //var selectedMake = this.makes.find((m: { id: any; }) => m.id == this.vehicle.make);
    this.models = selectedMake ? selectedMake.models : [];
    delete this.vehicle.modelId;
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
    this.vehicleService.create(this.vehicle)
      .subscribe(x => console.log(x));
  }
}
