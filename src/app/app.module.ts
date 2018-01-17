import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { HttpModule } from '@angular/http';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';

import { RegistroPage } from '../pages/registro/registro';
import { ReportePage } from '../pages/reporte/reporte';
import { InfoPage } from '../pages/info/info';
import { PromosPage } from '../pages/promos/promos';
import { EncuestaPage } from '../pages/encuesta/encuesta';



import {MenuPage} from '../pages/menu/menu';
import {DetallePage} from '../pages/detalle/detalle';

import { NativeStorage } from '@ionic-native/native-storage';
import { IonicStorageModule } from '@ionic/storage';

import { IonicImageViewerModule } from 'ionic-img-viewer';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductosProvider } from '../providers/productos/productos';

//animation






@NgModule({
  declarations: [
    MyApp,
    HomePage,
    RegistroPage,
    ReportePage,
    MenuPage,
    InfoPage,
    PromosPage,
    DetallePage,
    EncuestaPage,

  ],
  imports: [
    BrowserModule,HttpModule,
    IonicModule.forRoot(MyApp),
    IonicImageViewerModule,
     FormsModule,
        ReactiveFormsModule,
    IonicStorageModule.forRoot()
   

  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    RegistroPage,
    ReportePage,
    MenuPage,
    InfoPage,
    PromosPage,
    DetallePage,
    EncuestaPage
    
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    NativeStorage,
    IonicStorageModule,
    ProductosProvider,

     
   
  ]
})
export class AppModule {}
