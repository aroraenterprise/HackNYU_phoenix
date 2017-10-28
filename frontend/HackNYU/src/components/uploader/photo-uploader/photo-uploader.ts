import { ActionSheetController } from 'ionic-angular';
import { Component, Input, OnInit } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import { PictureSourceType, EncodingType, CameraOptions, Camera } from '@ionic-native/camera';

@Component({
  selector: 'photo-uploader',
  templateUrl: 'photo-uploader.html'
})
export class PhotoUploaderComponent implements ControlValueAccessor, OnInit {

  @Input() pictureOpt: CameraOptions;

  selectedImage: {};
  public onChange: any = Function.prototype;
  public onTouched: any = Function.prototype;

  defaultPictureOpt: CameraOptions = {
    quality: 75,
    sourceType: PictureSourceType.CAMERA,
    encodingType: EncodingType.JPEG,
    saveToPhotoAlbum: true,
    correctOrientation: true,
    targetWidth: 1200,
    targetHeight: 1200
  }

  constructor(
    private actionSheetCtrl: ActionSheetController,
    private cameraSvc: Camera
  ) {
  }

  ngOnInit() {
    this.pictureOpt = Object.assign(
      {},
      this.defaultPictureOpt,
      this.pictureOpt
    )
  }

  /** ControlValueAccessor implementation. */
  writeValue(value: number): void {
    if (value != null) {
      this.selectedImage = value
    }
  }

  /** ControlValueAccessor implementation. */
  registerOnChange(fn: (_: any) => {}): void {
    this.onChange = fn;
  }

  /** ControlValueAccessor implementation. */
  registerOnTouched(fn: (_: any) => {}): void {
    this.onTouched = fn;
  }

  takePhoto() {
    //ask where the photo is coming from
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Upload picture',
      buttons: [
        {
          text: 'Pick from Gallery',
          handler: () => {
            this.pictureOpt.sourceType = PictureSourceType.PHOTOLIBRARY
            this.capturePhoto();
          }
        },
        {
          text: 'Take Photo',
          handler: () => {
            this.pictureOpt.sourceType = PictureSourceType.CAMERA
            this.capturePhoto();
          }
        },
        {
          text: 'Cancel',
          role: 'cancel'
        }
      ]
    });
    actionSheet.present();
  }

  capturePhoto() {
    this.cameraSvc.getPicture(this.pictureOpt).then(img=>{
      console.log(img);
    })
  }

}
