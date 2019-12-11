import { Injectable } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { Storage } from '@ionic/storage';

class Photo {
  data: any;
}

@Injectable({
  providedIn: 'root'
})
export class PhotoService {

  private photos: Photo[] = [];

  constructor(private camera: Camera, private storage: Storage){}

  takePicture() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    };

    this.camera.getPicture(options).then((imageData) => {
      // this.photos.push(new Photo('data:image/jpeg;base64,' + imageData);
      this.photos.unshift({
        data: 'data:image/jpeg;base64,' + imageData 
      });
      
      this.storage.set('photos', this.photos)
    }, (err) => {
      // Handle error
      console.log("Camera issue:" + err);
    });
  }

  loadPhotos(){
    this.storage.get('photos').then((photos) =>{
      this.photos = photos || [];
    });
  }
}
