import { Component } from '@angular/core';
import { IonicPage, NavController,NavParams} from 'ionic-angular';
import {PromosPage}from '../promos/promos';
import {InfoPage}from '../info/info';
import {ReportePage}from '../reporte/reporte';
import {Http} from '@angular/http';
import { NativeStorage } from '@ionic-native/native-storage';


/**
 * Generated class for the MenuPage tabs.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-menu',
  templateUrl: 'menu.html'
})
export class MenuPage {
	 numero:number= 0;
	 id:any = "";

  infoRoot = InfoPage;
  reporteRoot = ReportePage;
  promosRoot = PromosPage;


  constructor(public navParams:NavParams, public navCtrl: NavController,private http:Http,private storage:NativeStorage) {
 	this.storage.getItem('id').then((json)=>{
		       if(json) {
		           this.id = JSON.parse(json);
		       }
		     })
  }
  ionViewdidEnter(){
  	this.getNumber();
  }
  getNumber(){
  	let url = "https://lander.arevolution.com.mx/api/clientes/"+this.id+"/notificaciones_nuevas";
  	this.http.get(url).map(res => res.json()).subscribe(data=> {
  		console.log(data);
  		this.numero = data.data;
  		console.log("este es el numero de this.numero" + this.numero);
  	},
  	(err)=>{
  		console.log(err);
  	});
  }

}

