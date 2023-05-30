import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';
import { Observable } from 'rxjs';
import { Photo } from 'src/app/_models/photo';
import { PhotoService } from 'src/app/_services/photo.service';
import { environment } from 'src/environments/environment.development';

@Component({
  selector: 'app-photo-list',
  templateUrl: './photo-list.component.html',
  styleUrls: ['./photo-list.component.css']
})
export class PhotoListComponent implements OnInit {
  @ViewChild('inputFile') inputFile: ElementRef | undefined;
  uploader: FileUploader | undefined;
  baseUrl: string = environment.apiUrl;

  photos$: Observable<Photo[]> | undefined;

  constructor(private photoService: PhotoService) {
  }

  ngOnInit(): void {
    this.initializeUploader();
    this.loadPhotos();
  }

  initializeUploader(): void {
    this.uploader = new FileUploader({
      url: this.baseUrl + 'photos',
      isHTML5: true,
      allowedFileType: ['image'],
      removeAfterUpload: true,
      autoUpload: false,
      maxFileSize: 10 * 1024 * 1024
    });

    this.uploader.onAfterAddingFile = (file) => {
      file.withCredentials = false
    }

    this.uploader.onSuccessItem = (item, response, status, headers) => {
      this.loadPhotos();
      if (this.inputFile)
        this.inputFile.nativeElement.value = '';
    }
  }

  loadPhotos(): void {
    this.photos$ = this.photoService.getPhotos();
  }

  deletePhoto(photoId: number): void {
    this.photoService.deletePhoto(photoId).subscribe({
      next: () => this.loadPhotos(),
      error: error => console.log(error)
    })
  }
}
