import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NativeAudio } from '@ionic-native/native-audio';

/*
  Generated class for the SoundProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class SoundProvider {

  constructor(public http: HttpClient) {
    console.log('Hello SoundProvider Provider');
  }
}
