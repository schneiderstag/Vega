import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SaveVehicle } from '../models/vehicle';

@Injectable({
  providedIn: 'root'
})
export class VehicleService {
  private readonly vehiclesEndpoint = '/api/vehicles';

  constructor(private http: HttpClient) { }

  // By default the HttpClient deserializes the content of a response into an object.
  // Some of its methods allow passing a generic type argument in order to duck - type the result.
  // Thats why there is no json() method anymore.
  // return this.http.get('api/makes').pipe(map(res => res.json()));
  getMakes() {
    return this.http.get('/api/makes');
  }

  getModels() {
    return this.http.get('/api/models');
  }

  getFeatures() {
    return this.http.get('/api/features');
  }

  create(vehicle: SaveVehicle) {
    return this.http.post(this.vehiclesEndpoint + '/', vehicle);
  }

  update(vehicle: SaveVehicle) {
    return this.http.put(this.vehiclesEndpoint + '/' + vehicle.id, vehicle);
  }

  getVehicle(id) {
    return this.http.get(this.vehiclesEndpoint + '/' + id);
  }

  getVehicles(filter) {
    return this.http.get(this.vehiclesEndpoint + '?' + this.toQueryString(filter));
  }

  delete(id) {
    return this.http.delete(this.vehiclesEndpoint + '/' + id);
  }

  private toQueryString(obj) {
    var parts = [];

    for (var property in obj) {
      var value = obj[property];
      if (value != null && value != undefined)
        parts.push(encodeURIComponent(property) + '=' + encodeURIComponent(value));
    }

    return parts.join('&');
  }
}
