import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { AboutPage } from '../pages/about/about';
import { MenuPage } from '../pages/menu/menu';
import { ContactPage } from '../pages/contact/contact';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
//import { PuzzleProvider } from '../providers/puzzles/puzzles';
import { ProcessHttpmsgProvider } from '../providers/process-httpmsg/process-httpmsg';
//import { baseURL } from '../shared/baseurl';
import { PuzzleDbService } from '../providers/puzzle-db/puzzle-db';
import { SoundsProvider } from '../providers/sounds/sounds';
import { NativeAudio } from '@ionic-native/native-audio';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    AboutPage,
    MenuPage,
    ContactPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    AboutPage,
    MenuPage,
    ContactPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ProcessHttpmsgProvider,
    //PuzzleProvider,
    //{ provide: 'BaseURL', useValue: baseURL},
    PuzzleDbService,
    NativeAudio
  ]
})
export class AppModule {}
