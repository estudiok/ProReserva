import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder
} from '@angular/forms';
import { alertController } from '@ionic/core';
import { NavController } from '@ionic/angular';
import { Rol } from 'src/app/models/Rol';
import { ReservacionService } from 'src/app/services/reservacion.service';


@Component({
  selector: 'app-add',
  templateUrl: './add.page.html',
  styleUrls: ['./add.page.scss'],
})
export class AddPage implements OnInit {
  
  fmRegister: FormGroup;
  roles: Rol[];
  
  constructor(
    public fmBuilder: FormBuilder,
    private reserva_service: ReservacionService,
    private navController: NavController
  ) { 
    this.fmRegister = this.fmBuilder.group({
      'usuario': new FormControl("", Validators.required),
      'nombre': new FormControl("", Validators.required),
      'apellido': new FormControl("", Validators.required),
      'idRol': new FormControl("", Validators.required),
      'contrasenia': new FormControl("", Validators.required)
    })
  }

  ngOnInit() {
    this.reserva_service.obtenerRoles().subscribe(
      (roles: Rol[]) => {
        this.roles = roles;
      }
    )
  }

  async guardarUsuario() {
    let form = this.fmRegister.value;
    if (this.fmRegister.invalid) {
        const alert = await alertController.create({
          header: "",
          message: "Llene los datos faltantes",
          buttons: ['Aceptar']
        });

        await alert.present();
      } else {

        let data = {
          idRol: form.idRol,
          usuario: form.usuario,
          nombre: form.nombre,
          apellido: form.apellido,
          contrasenia: form.contrasenia
        }

        this.reserva_service.guardarUsuario(data).subscribe(
          (status) => {
            console.log(status);
            this.navController.navigateRoot("menu/admin/home")
          }
        );

        console.log(data);

      }


  }

}
