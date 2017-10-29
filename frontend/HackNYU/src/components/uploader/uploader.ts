import { Injectable } from '@angular/core';
import { File } from '@ionic-native/file';
import { FileTransfer, FileTransferObject, FileUploadOptions } from '@ionic-native/file-transfer';
import { Observable } from 'rxjs/Rx';

import { Media, MediaService, MediaUpload } from '../../client-lib';


@Injectable()
export class Uploader {

    constructor(
        private transfer: FileTransfer,
        private file: File,
        private mediaSvc: MediaService
    ) {

    }

    uploadPhoto(fileUrl: string, { filename, contentType, data }): Observable<Media> {
        return this.mediaSvc.upload({
            mediaType: 'photo',
            filename: filename,
            contentType: contentType,
            data: data
        })
            .switchMap((uploadData: MediaUpload) => {
                const fileTransfer: FileTransferObject = this.transfer.create();
                return fileTransfer.upload(
                    fileUrl,
                    uploadData.url,
                    this.getFileUploadOptions(filename, uploadData)
                ).then(() => {
                    console.log('uploaded file');
                    return uploadData.media;
                })
            })
    }

    private getFileUploadOptions(filename: string, uploadData: MediaUpload) {
        return <FileUploadOptions>{
            fileKey: "file",
            fileName: filename,
            chunkedMode: false,
            httpMethod: 'POST',
            params: {
                key: uploadData.key,
                bucket: uploadData.bucket,
                GoogleAccessId: uploadData.googleAccessId,
                acl: uploadData.acl,
                policy: uploadData.policy,
                signature: uploadData.signature,
                "Content-Type": uploadData.contentType
            },
        };
    }

}