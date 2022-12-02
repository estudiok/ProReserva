import { Component, OnInit } from '@angular/core';
import { PrestamoLibro } from '../models/prestamolibro';
import { Usuario } from '../models/usuario';
import { ReservacionService } from '../services/reservacion.service';

@Component({
  selector: 'app-es-reserva',
  templateUrl: './es-reserva.page.html',
  styleUrls: ['./es-reserva.page.scss'],
})
export class EsReservaPage implements OnInit {

  user:Usuario;
  presLibros: PrestamoLibro[];

  constructor(
    private reserva_service: ReservacionService
  ) { }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem("usuario")) as Usuario;
  }
  
  ionViewWillEnter() {
    this.reloadListReserva();
  }
  
  reloadListReserva() {
    this.reserva_service.listPrestamosEstudiante(this.user.idUsuario).subscribe(
      (presLibros: PrestamoLibro[]) => {
        this.presLibros = presLibros;
        console.log(presLibros);
      }
    );
  }


  cancelarPrestamo(idLibro) {
    this.reserva_service.cancelarPrestamo(this.user.idUsuario, idLibro).subscribe(
      (status) => {
        console.log(status);
        this.reloadListReserva();
      }
    );
  }

}
