import { Component, OnInit } from '@angular/core';
import { Libro } from '../models/libro';
import { ReservacionService } from '../services/reservacion.service';

@Component({
  selector: 'app-bi-hlibro',
  templateUrl: './bi-hlibro.page.html',
  styleUrls: ['./bi-hlibro.page.scss'],
})
export class BiHlibroPage implements OnInit {

  libros: Libro[];

  constructor(
    private reserva_service: ReservacionService
  ) { }

  ngOnInit() {

  }

  reloadAllLibros() {
    this.reserva_service.obtenerTodosLibros().subscribe(
      (libros: Libro[]) => {
        console.log(libros);
        this.libros = libros;
      }
    );
  }

  ionViewWillEnter() {
    this.reloadAllLibros();
  }




}
