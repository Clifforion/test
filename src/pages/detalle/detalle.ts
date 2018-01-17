import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {Http, Headers} from '@angular/http';
import {EncuestaPage} from '../encuesta/encuesta'
import {MenuPage} from '../menu/menu';


/**
 * Generated class for the DetallePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-detalle',
  templateUrl: 'detalle.html',
})
export class DetallePage {
	idN:any;
  idR:any;
	notificacion:any={};
  visto={"visto":true};
	
  constructor(public http:Http,public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
   this.idN=this.navParams.get('idN');
   this.idR=this.navParams.get('idR');
   console.log("id de notifiacion: " + this.idN);
   console.log("id de Reporte: " + this.idR);

   this.notifica();
  }

  ionViewDidLeave(){
    this.borra();
  }


  notifica(){
  	let url = 'https://lander.arevolution.com.mx/api/notificaciones/'+this.idN;
	this.http.get(url).map(res => res.json()).subscribe(data=>{
	console.log(data);
	this.notificacion = data.data;
	},
	(err) =>{
	console.log(err);
});}


  encuesta(idR){
    this.navCtrl.push(EncuestaPage,{idR});

  }

  borra(){
     let url="https://lander.arevolution.com.mx/api/notificacion/"+this.idN+"/visto";
     let headers = new Headers();
                        headers.append('content-type','application/json');
                    this.http.put(url,JSON.stringify(this.visto),{headers:headers}).map(res => res.json()).subscribe(data=>{
                      console.log(data);
                    },
                     (err =>{
                       console.log(err);
                     }));
  }

}


   