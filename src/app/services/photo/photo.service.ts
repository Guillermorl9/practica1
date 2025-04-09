import {Injectable} from '@angular/core';
import {Camera, CameraResultType, CameraSource, Photo} from "@capacitor/camera";

@Injectable({
  providedIn: 'root'
})
export class PhotoService {

  constructor() { }

  async takePhoto(): Promise<String> {
    const image: Photo = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.Uri,
      source: CameraSource.Camera
    });
    return image.webPath || '';
  }

  async importPhoto(): Promise<string> {
    const image: Photo = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.Base64,
      source: CameraSource.Photos
    })
    return image.base64String || 'https://ionicframework.com/docs/img/demos/avatar.svg';
    //return JSON.stringify(image);
  }

}
