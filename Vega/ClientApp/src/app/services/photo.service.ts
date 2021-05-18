import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PhotoService {

  constructor(private http: HttpClient) { }

  upload(vehicleId, photo) {
    var formData = new FormData();
    formData.append('file', photo); //photo is coming as file: IFormFile parameter in PhotosController.Upload()
    return this.http.post(`/api/vehicles/${vehicleId}/photos`, formData);
  }

  getPhotos(vehicleId) {
    return this.http.get(`/api/vehicles/${vehicleId}/photos`);
  }
}
