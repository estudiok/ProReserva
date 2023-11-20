import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder
} from '@angular/forms';
import { NavController } from '@ionic/angular';
import { alertController } from '@ionic/core';
import { Usuario } from '../models/usuario';
import { ReservacionService } from '../services/reservacion.service';
import { RolHelper } from '../models/roleshelp';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  fmLogin: FormGroup;

  constructor(
    public fmBuilder: FormBuilder,
    private reserva_service: ReservacionService,
    private navController: NavController
  ) { 
    
    this.fmLogin = this.fmBuilder.group({
      'user': new FormControl("", Validators.required),
      'password': new FormControl("", Validators.required)
    })

  }

  ngOnInit() {

  }



  async logearse() {
    let form = this.fmLogin.value;

    if (this.fmLogin.invalid) {
      const alert = await alertController.create({
        header: "",
        message: "Llene los datos faltantes",
        buttons: ['Aceptar']
      });

      await alert.present();
    } else {
      let data = {
        user: form.user,
        pass: form.password
      }

      this.reserva_service.obtenerCredencial(data).subscribe(
        async (user: Usuario) => {
          if (Object.keys(user).length === 0) {
            const alertU = await alertController.create({
              header: "",
              message: "No hay usuario",
              buttons: ['Aceptar']
            });
            await alertU.present();
          } else {
            localStorage.setItem("usuario", JSON.stringify(user[0]));
            let idRol = user[0].idRol;
            if (idRol == RolHelper.estudiante) {
              this.navController.navigateRoot("menu/eshome");
            } else if (idRol == RolHelper.bibliotecario) {
              this.navController.navigateRoot("menu/bihome");
            } else if (idRol == RolHelper.admin){
              this.navController.navigateRoot("menu/admin/home");
            }

          }

        }

      );

    }


  }

}
