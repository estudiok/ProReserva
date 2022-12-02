import { Component, OnInit } from '@angular/core';
import { Libro } from '../models/libro';
import { Usuario } from '../models/usuario';
import { ReservacionService } from '../services/reservacion.service';

@Component({
  selector: 'app-es-home',
  templateUrl: './es-home.page.html',
  styleUrls: ['./es-home.page.scss'],
})
export class EsHomePage implements OnInit {


  libros: Libro[];
  search: string;
  usuario: Usuario;

  constructor(
    private reserva_service: ReservacionService
  ) { }

  ngOnInit() {
    this.usuario = JSON.parse(localStorage.getItem("usuario")) as Usuario;
  }

  reloadLibros() {
    this.reserva_service.obtenerLibrosDisponibles().subscribe(
      (libros: Libro[]) => {
        this.libros = libros;
      }
    );
  }

  ionViewWillEnter() {  
    this.reloadLibros();
  }

  readSearch($event) {
    this.search = $event.target.value;
  }

  changeTimeZone(date, timeZone) {
    if (typeof date === 'string') {
      return new Date(
        new Date(date).toLocaleString('en-US', {
          timeZone,
        }),
      );
    }
  
    return new Date(
      date.toLocaleString('en-US', {
        timeZone,
      }),
    );
  }

  
  formatDateNow() {
    let dateNow = this.changeTimeZone(new Date(), 'America/La_Paz');
    let date = dateNow.toLocaleDateString().split('/')
    let auxDate = date[2] + '-' + date[1] + '-' + date[0];
    let hour = dateNow.toLocaleTimeString();
    let concat = auxDate + ' ' + hour;
     return concat;
  }

  busquedaLibro() {
    this.reserva_service.busquedaLibro(this.search).subscribe(
      (libros: Libro[]) => {
        this.libros = libros;
        console.log(libros);
      }
    );
  }

  reservarLibro(idLibro) {
    let data = {
      idLibro: idLibro,
      idEstudiante: this.usuario.idUsuario,
      fechaSolicitud: this.formatDateNow()

    }
    
    this.reserva_service.setDisponible(idLibro, false).subscribe(
      (status) => {
        console.log(status);
        this.reloadLibros();
      }
    );

    this.reserva_service.setPrestamoParcial(data).subscribe(
      (status) => {
        console.log(status);
      }
    );


  }


}
