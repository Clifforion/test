import { Component } from '@angular/core';
import {  NavController, NavParams ,App} from 'ionic-angular';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import {DetallePage} from '../detalle/detalle';
import { NativeStorage } from '@ionic-native/native-storage';
import {HomePage} from '../home/home';









@Component({
  selector: 'page-promos',
  templateUrl: 'promos.html',
})
export class PromosPage {
	notificaciones:any=[];
	id:any="";
 constructor(public app:App,public storage:NativeStorage,public http:Http,public navCtrl: NavController, public navParams: NavParams) { 
 	this.storage.getItem('id').then((json)=>{
		       if(json) {
		           this.id = JSON.parse(json);
		       }
		     })
  }
  	ionViewDidEnter() {	  
		this.notifica();
  }



 notifica(){
 	let url = "https://lander.arevolution.com.mx/api/clientes/"+this.id+"/notificaciones";
	this.http.get(url).map(res => res.json()).subscribe(data=>{
	console.log(data);
	this.notificaciones = data.data;
	},
	(err) =>{
	console.log(err);
});}

detalle(idN,idR){
	this.navCtrl.push(DetallePage,{idN,idR});
}

  salir(){
        this.storage.clear();
        this.app.getRootNav().setRoot(HomePage);
  }


}
