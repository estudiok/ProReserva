import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder
} from '@angular/forms';
import { alertController } from '@ionic/core';
import { NavController } from '@ionic/angular';
import { Categoria } from '../models/categoria';
import { ReservacionService } from '../services/reservacion.service';

@Component({
  selector: 'app-bi-rlibro',
  templateUrl: './bi-rlibro.page.html',
  styleUrls: ['./bi-rlibro.page.scss'],
})
export class BiRlibroPage implements OnInit {

  fmLogin: FormGroup;
  idCategoriaSelect: number;
  categorias: Categoria[];

  constructor(
    public fmBuilder: FormBuilder,
    private reserva_service: ReservacionService,
    private navController: NavController
  ) { 
    
    this.fmLogin = this.fmBuilder.group({
      'titulo': new FormControl("", Validators.required),
      'autor': new FormControl("", Validators.required),
      'codigo': new FormControl("", Validators.required),
      'idCategoria': new FormControl("", Validators.required)
    })
    

    // idCategoria, titulo, autor, codigo

  }

  reloadCategorias() {
    this.reserva_service.obtenerCategorias().subscribe(
      (categorias: Categoria[]) => {
        console.log(categorias);
        this.categorias = categorias;
      }
    );
  }
  ngOnInit() {

  }

  ionViewWillEnter() {
    this.reloadCategorias();
  }

  

  async registrar() {

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
        idCategoria: form.idCategoria,
        titulo: form.titulo,
        autor: form.autor,
        codigo: form.codigo
      }

      this.reserva_service.crearLibro(data).subscribe(
        (status) => {
          console.log(status);
          this.navController.navigateRoot("bimenu/bihlibro")
        }
      );
      console.log(data);
    }
    
  }

}
