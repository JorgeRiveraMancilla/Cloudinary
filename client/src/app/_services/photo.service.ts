import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { Photo } from '../_models/photo';

@Injectable({
  providedIn: 'root'
})
export class PhotoService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getPhotos() {
    return this.http.get<Photo[]>(this.baseUrl + 'photos');
  }

  deletePhoto(photoId: number) {
    return this.http.delete(this.baseUrl + 'photos/' + photoId);
  }
}
