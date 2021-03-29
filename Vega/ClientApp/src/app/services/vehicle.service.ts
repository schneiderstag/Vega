import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class VehicleService {

  constructor(private http: HttpClient) { }

  // By default the HttpClient deserializes the content of a response into an object.
    // Some of its methods allow passing a generic type argument in order to duck - type the result.
    // Thats why there is no json() method anymore.
    //return this.http.get('api/makes').pipe(map(res => res.json()));
  getMakes() {
    return this.http.get('/api/makes');
  }

  getFeatures() {
    return this.http.get('/api/features');
  }

  create(vehicle) {
    return this.http.post('/api/vehicles', vehicle);
  }

  getVehicle(id) {
    return this.http.get('/api/vehicles/' + id);
  }
}
