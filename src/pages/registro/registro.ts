import { Component } from '@angular/core';
import {NavController, NavParams,App } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import {MenuPage} from '../menu/menu';
import {HomePage} from '../home/home';
import {Http,Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import { NativeStorage } from '@ionic-native/native-storage';







@Component({
  selector: 'page-registro',
  templateUrl: 'registro.html',
})
export class RegistroPage {
  responseData : any;
  userData = {"name":"","email":"", "password": "","password_confirmation":""};
  confirmar:string='';
  url ='https://lander.arevolution.com.mx/api/clientes/registrar';
  get:any={};
    
  constructor(public storage:NativeStorage,public http:Http,public app:App,public toastCtrl: ToastController,public alertCtrl: AlertController,public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
  }



    registro(){
          if(this.userData.name ===''||this.userData.email ===''||this.userData.password ===''|| this.userData.password_confirmation==='') {
           let toast = this.toastCtrl.create({
          message: 'Debes llenar todos los campos',
          duration: 3000
            });
            toast.present();

          }else{
              if(this.userData.email.indexOf('@') == -1 || this.userData.email.indexOf('.com')== - 1) {
              this.valida('Debes escribir un correo valido ejemplo: "nombre@micorreo.com"');
          }else{

             if(this.userData.password.length <6 || 
                this.userData.password_confirmation.length <6 ) {
                this.valida('La contraseña debe ser de 6 o más dígitos');
          }else{
            if(this.userData.password != this.userData.password_confirmation) {
            let toast = this.toastCtrl.create({
            message: 'Las contraseñas deben ser iguales',
            duration: 3000
              });
            toast.present();
            }else{
                    let headers = new Headers();
                    headers.append('content-type','application/json');
                    this.http.post(this.url,JSON.stringify(this.userData),{headers:headers}).map(res => res.json()).subscribe(data=>{
                      this.get = data.data;
                       console.log(this.get);
                       this.storage.setItem('data',JSON.stringify(this.get));
                       this.storage.setItem('id',JSON.stringify(this.get.id));
                      console.log(data);
                      this.correcto();
                      this.navCtrl.push(MenuPage);
                    },
                    (err =>{
                      console.log(err);
                      if(err.status == 422) {
                         this.incorrecto('Su nombre no se encuentra en nuestros registros, intente escribiéndolo completo empezando por apellidos , sin acentos y solo 1 espacio');
                      }
                    }));
          }
        }

     }
             
  }

}
     
     valida(msg){
        let toast = this.toastCtrl.create({
        message: msg,
        duration: 5000
            });
            toast.present();
    }

    correcto(){
        let toast = this.toastCtrl.create({
        message: 'Datos guardados correctamente',
        duration: 4000
            });
            toast.present();
          this.limpia();
    }
    incorrecto(err){
        let toast = this.toastCtrl.create({
        message: err,
        duration: 4000
        });
        toast.present();
          }
    
  public Home(){
        this.app.getRootNav().setRoot(HomePage);
       }

    public limpia(){
      this.userData.name='';
      this.userData.email='';
      this.userData.password='';
      this.confirmar='';
    }


  }
