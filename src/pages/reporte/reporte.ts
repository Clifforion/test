import { Component } from '@angular/core';
import { App, NavController, AlertController,NavParams ,ToastController} from 'ionic-angular';
import {Http, Headers} from '@angular/http';
import { NativeStorage } from '@ionic-native/native-storage';
import {HomePage} from '../home/home';






@Component({
  selector: 'page-reporte',
  templateUrl: 'reporte.html',
})
export class ReportePage {
id:any="";
garantias:any =[];
datos={"celular":"","detalles":"","horario":"","garantia_id":""}
error:any={};

  constructor(public app:App,
              public toast:ToastController,
              public alertCtrl:AlertController,
              public storage:NativeStorage,
              public http:Http,
              public navCtrl: NavController,
              public navParams: NavParams){
  }



  ionViewDidLoad() {
    this.storage.getItem('id').then((json)=>{
      if(json) {
          this.id = JSON.parse(json);

      }
    });

    this.getGarantias();
  }





  reporte(){
    console.log(this.datos);
      if (this.datos.celular=="" || this.datos.detalles==="" || this.datos.horario=="" || this.datos.garantia_id=="") {
          this.Valida("Debe llenar los campos");
        }else{
          if(this.datos.celular.length <10) {
            this.Valida("El número telefónico debe ser de 10 dígitos");
          }else{
  		let url="https://lander.arevolution.com.mx/api/clientes/"+this.id+"/reportes";
	   let headers = new Headers();
                    headers.append('content-type','application/json');
                    this.http.post(url,JSON.stringify(this.datos),{headers:headers}).map(res => res.json())
                      .subscribe(data=>
                        {
                          console.log(data);
                          this.correcto();
                          this.limpia();  
                        },
                     (err =>{
                       this.error = err.status;
                       console.log(this.error);
                      if(this.error == 422 ) {
                       this.incorrecto("Vigencia vencida","Estimado cliente su garantía ya no cuenta con vigencia de acuerdo al Manual de Usuario."+
                       "<br><h6>Lo invitamos a descargar el Manual de Mantenimiento.</h6>");
                      }else{
                       this.incorrecto("Estimado usuario","Hubo un error intente mas tarde");
                      }

                     }));
                  }
                  }
                }





getGarantias(){
    let url = "https://lander.arevolution.com.mx/api/garantias";
     this.http.get(url).map(res => res.json()).subscribe(data=>{
     console.log(data.data);
     this.garantias = data.data;
      },
      (err) =>{
      console.log(err);
          });
   }



incorrecto(msg,err){

    let alert =this.alertCtrl.create({
      cssClass:'alertDanger',
      title:msg,
      message: err,
      buttons:['OK']
    });
      alert.present();
  }

  correcto(){
    let alert =this.alertCtrl.create({
      title:'Correcto',
      message:'Reporte enviado ',
      buttons:['OK'],
    });
      alert.present();
  }

  limpia(){
    this.datos.celular="";
    this.datos.detalles="";
    this.datos.horario="";
    this.datos.garantia_id="";
  }

Valida(msg) {
    let toast = this.toast.create({
      message: msg,
      duration: 5000
    });
    toast.present();
  }

    salir(){
        this.storage.clear();
        this.app.getRootNav().setRoot(HomePage);
  }
}
