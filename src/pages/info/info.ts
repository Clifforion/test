import { Component } from '@angular/core';
import { NavController, NavParams,App,ToastController } from 'ionic-angular';
import {HomePage} from '../home/home';
import { NativeStorage } from '@ionic-native/native-storage';
import {Http, Headers} from '@angular/http';




@Component({
  selector: 'page-info',
  templateUrl: 'info.html',
})
export class InfoPage {
  datos:any={};
  activo:number=0;
  pass={"password":"","password_confirmation":""};

  constructor(private storage:NativeStorage,
              private app:App,
              private navCtrl: NavController, 
              private navParams: NavParams,
              private toastCtrl:ToastController,
              private http:Http) {
  }

  ionViewDidLoad() {
    this.storage.getItem('data').then((json)=>{
      if(json) {
          this.datos = JSON.parse(json);
      }
    })
  }

   

  salir(){
        this.storage.clear();
        this.app.getRootNav().setRoot(HomePage);
  }

  enviar(){
    if(this.pass.password =="" || this.pass.password_confirmation=="") {
      this.toast("Debes llenar los campos");
    }else{
      if(this.pass.password.length < 6 || this.pass.password_confirmation.length < 6) {
          this.toast("La contraseña debe ser de 6 o más dígitos");
      }else{
    if(this.valida()) {
      this.toast("Las contraseñas deben ser iguales");
    }else{
    this.post();
      console.log(this.pass);
      this.activo=0;
    }
   }
 }
   
 }

post(){
  let url = "https://lander.arevolution.com.mx/api/clientes/"+this.datos.id;
                 let headers = new Headers();
                        headers.append('content-type','application/json');
                    this.http.put(url,JSON.stringify(this.pass),{headers:headers}).map(res => res.json()).subscribe(data=>{
                      console.log(data);
                        this.toast("Contraseña Actualizada");
                    },
                     (err =>{
                       this.toast("Hubo un error intente mas tarde");
                       console.log(err);
                     }));
                  }



  valida(){
    if(this.pass.password != this.pass.password_confirmation) {
       return true;
    }else{return false;}
  }


  toast(msg){
    let toast = this.toastCtrl.create({
      message:msg,
      duration:3000,
    });
    toast.present();
  }

  limpia(){
    this.pass.password ="";
    this.pass.password_confirmation ="";
  }

  activar(){
    if(this.activo== 0) {
        this.activo=1;
        console.log(this.activo);
    }else{
      this.activo=0;
      console.log(this.activo);
    }
  }

}
