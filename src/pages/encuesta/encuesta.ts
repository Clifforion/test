import { Component } from '@angular/core';
import { NavController, NavParams,ToastController } from 'ionic-angular';
import {Http, Headers} from '@angular/http';




@Component({
  selector: 'page-encuesta',
  templateUrl: 'encuesta.html',
})
export class EncuestaPage {
	datos = {"p1":"","pq1":"","p2":"","pq2":"","p3":"","pq3":"","p4":"","pq4":"",
	"p5":"","pq5":"","p6":"","p7":""};
  idR:any="";

  constructor(public http:Http, public toast:ToastController, public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
   this.idR= this.navParams.get('idR');
   console.log("id del reporte: " + this.idR);
  }

   correcto() {
    let toast = this.toast.create({
      message: 'Gracias por contestar la encuesta, Se ha enviado correctamente',
      duration: 3000
    });
    toast.present();
  }

   encuesta(){
       if(this.datos.p1 == "" || this.datos.p2 == "" || this.datos.p3 == "" || this.datos.p4 == "" ||  this.datos.p5 == "" ||  this.datos.p6 == "") {
         this.incorrecto("Favor de contestar todas las preguntas");
    }else{
     console.log(this.datos);
     let url= "https://lander.arevolution.com.mx/api/reportes/"+this.idR+"/encuestas";
	   let headers = new Headers();
                    headers.append('content-type','application/json');
                    this.http.post(url,JSON.stringify(this.datos),{headers:headers}).map(res => res.json()).subscribe(data=>{
                      console.log(data);
                      this.correcto();
                    },
                     (err) =>{
                       console.log(err);
                       this.incorrecto("Hubo un error al mandar los datos, intente de nuevo"); 
                     });
                  }
                }

   incorrecto(msg) {
    let toast = this.toast.create({
      message: msg,
      duration: 3000
    });
    toast.present();
  }
}