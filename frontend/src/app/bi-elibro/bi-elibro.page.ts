import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Libro } from '../models/libro';
import { ReservacionService } from '../services/reservacion.service';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder
} from '@angular/forms';
import { NavController } from '@ionic/angular';
import { Categoria } from '../models/categoria';

@Component({
  selector: 'app-bi-elibro',
  templateUrl: './bi-elibro.page.html',
  styleUrls: ['./bi-elibro.page.scss'],
})
export class BiElibroPage implements OnInit {

  id: string;
  libro: Libro;
  fmLogin: FormGroup;
  categorias: Categoria[];
  
  test: string = "perro";

  constructor(
    public fmBuilder: FormBuilder,
    private navController: NavController,
    private activateRoute: ActivatedRoute,
    private reserva_service: ReservacionService
  ) { 
    
    this.id = this.activateRoute.snapshot.paramMap.get("id");

 
    this.fmLogin = this.fmBuilder.group({
      'titulo': new FormControl(this.test, Validators.required),
      'autor': new FormControl("", Validators.required),
      'codigo': new FormControl("", Validators.required),
      'idCategoria': new FormControl("", Validators.required)
    })

    this.reserva_service.obtenerLibroActualizar(this.id).subscribe(
      (libro: Libro) => {
        this.libro = libro[0];
        console.log(this.libro);
        this.fmLogin.setValue({
          titulo: this.libro.titulo,
          autor: this.libro.autor,
          codigo: this.libro.codigo,
          idCategoria: this.libro.idCategoria
        });

      }
    )

   

    // console.log(this.libro);





    console.log(this.id);
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

  reloadLibro() {
    this.reserva_service.obtenerLibroActualizar(this.id).subscribe(
      (libro: Libro) => {
        this.libro = libro[0];
      }
    )
  }

  ionViewWillEnter() {

  }

}
