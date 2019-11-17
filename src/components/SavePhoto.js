import React from 'react';
import Camera from 'react-html5-camera-photo';
import 'react-html5-camera-photo/build/css/index.css';
import { storage } from '../utils/firebase';

const b64toBlob = (dataURI) => {

    var byteString = atob(dataURI.split(',')[1]);
    var ab = new ArrayBuffer(byteString.length);
    var ia = new Uint8Array(ab);

    for (var i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ab], { type: 'image/jpg' });
}

export default function SavePhoto({ prefix = '', setPhoto }) {

    const onTakePhoto = async (photo) => {
        const blob = b64toBlob(photo);
        const photoName = `$${prefix}${Date.now()}.jpg`;
        await storage.ref().child(photoName).put(blob);
        const photoUrl = await storage.ref().child(photoName).getDownloadURL();
        setPhoto(photoUrl);
    };

    return (
        <Camera imageType='jpg'
            onTakePhoto={(dataUri) => { onTakePhoto(dataUri) }}
        />
    );
}