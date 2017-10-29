import { Component, EventEmitter, forwardRef, Input, OnInit, Output } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Camera, CameraOptions, EncodingType, PictureSourceType } from '@ionic-native/camera';
import { ActionSheetController, ToastController } from 'ionic-angular';

import { Media } from '../../../client-lib';
import { Uploader } from '../uploader';

@Component({
  selector: 'photo-uploader',
  templateUrl: 'photo-uploader.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => PhotoUploaderComponent),
      multi: true,
    }
  ]
})
export class PhotoUploaderComponent implements ControlValueAccessor, OnInit {

  @Input() pictureOpt: CameraOptions;
  @Input() filename: string;
  @Input() data: any;

  @Output('photoChanged') public photoChanged: EventEmitter<Media> = new EventEmitter<Media>();

  isUploading: boolean = false;
  currentImage: Media;
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
    private cameraSvc: Camera,
    private uploader: Uploader,
    private toastCtrl: ToastController
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
  writeValue(value: Media): void {
    if (value != null) {
      this.currentImage = value
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
    if (this.isUploading) {
      this.toastCtrl.create({
        message: 'Busy! Uploading an image.',
        duration: 2000
      }).present();
      return;
    }

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
    this.cameraSvc.getPicture(this.pictureOpt).then(filePath => {
      this.isUploading = true;
      this.uploader.uploadPhoto(
        filePath,
        {
          filename: this.filename || 'image.jpeg',
          contentType: 'image/jpeg',
          data: this.data || {}
        }
      ).subscribe((data) => {
        this.currentImage = data;
        this.onChange(this.currentImage);
        this.photoChanged.emit(this.currentImage);
        this.isUploading = false;
        this.toastCtrl.create({
          message: 'Awesome! Photo uploaded successfully.',
          duration: 2000
        }).present();
      }, (err) => {
        this.isUploading = false;
        this.toastCtrl.create({
          message: 'Oh no, something went wrong. Try again!',
          duration: 2000
        }).present();
      })
    })
  }

}
