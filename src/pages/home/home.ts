import {Injectable} from '@angular/core';
import { Component } from '@angular/core';
import { App, NavController, AlertController, LoadingController,NavParams } from 'ionic-angular';
import {RegistroPage} from '../registro/registro';
import {MenuPage} from '../menu/menu';
import {Http,Headers} from '@angular/http';

import { NativeStorage } from '@ionic-native/native-storage';





@Injectable()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  datos = {"email":"","password":""}
  url = 'https://lander.arevolution.com.mx/api/login';
  get:any={};
  

  constructor(public app:App,public storage:NativeStorage, public navParams:NavParams, public http:Http,public navCtrl: NavController,public alertCtrl: AlertController, public loadingCtrl:LoadingController) {}
    
login(){
	    let headers = new Headers();
                     headers.append('content-type','application/json');
                     this.http.post(this.url,JSON.stringify(this.datos),{headers:headers}).map(res => res.json()).subscribe(data=>{
                       this.get = data.data[0];
                       console.log(this.get);
                       console.log(this.get.id);
                       this.storage.setItem('data',JSON.stringify(this.get));
                       this.storage.setItem('id',JSON.stringify(this.get.id));
                       this.correcto(this.get.name);
                    	this.navCtrl.push(MenuPage);
                     },
                      (err) =>{
                        console.log(err);
                        this.incorrecto();
                      });}



 ionViewDidLoad() {
    this.storage.getItem('data').then((json)=>{
      if(json) {
          this.Skip();
      }else{}
    })
  }


 Skip(){
        this.app.getRootNav().setRoot(MenuPage);
  }

// login(){
// this.navCtrl.push(MenuPage);
// }

registro(){
  	this.navCtrl.push(RegistroPage);
  }


incorrecto(){
  	let alert =this.alertCtrl.create({
  		title:'Error',
  		message:'El usuario/contraseña son incorrectos, verifica los datos',
  		buttons:['OK']
  	});
      alert.present();
  }

  correcto(user){
    let alert =this.alertCtrl.create({
      title:'Correcto',
      message:'Bienvenido ' + user,
      buttons:['OK'],
    });
      alert.present();
  }

  limpia(){
    this.datos.email='';
    this.datos.password='';
  }


}
