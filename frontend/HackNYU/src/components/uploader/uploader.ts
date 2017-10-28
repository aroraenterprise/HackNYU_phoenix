import { Observable } from 'rxjs/Rx';
import { MediaService, MediaUploadParam } from '../../client-lib';
import { Injectable } from '@angular/core';
import { File } from '@ionic-native/file';
import { FileTransfer } from '@ionic-native/file-transfer';

@Injectable()
export class Uploader {

    constructor(
        private transfer: FileTransfer, 
        private file: File,
        private mediaSvc: MediaService
    ){

    }

    uploadPhoto({filename, contentType, data}){
        return this.mediaSvc.upload({
            mediaType: 'photo',
            filename: filename,
            contentType: contentType,
            data: data
        })
        .switchMap(uploadData =>{
            console.log(uploadData);
            return Observable.of({})
        })
    }


}