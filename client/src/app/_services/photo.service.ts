import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { Photo } from '../_models/photo';
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PhotoService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getPhotos(): Observable<Photo[]> {
    return this.http.get<Photo[]>(this.baseUrl + 'photos');
  }

  deletePhoto(photoId: number): Observable<void> {
    return this.http.delete<void>(this.baseUrl + 'photos/' + photoId);
  }
}
