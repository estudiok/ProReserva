import { Component, OnInit } from '@angular/core';
import { Usuario } from '../models/usuario';
import { UsuarioLibPres } from '../models/usuariolibpres';
import { ReservacionService } from '../services/reservacion.service';

@Component({
  selector: 'app-bi-reserva',
  templateUrl: './bi-reserva.page.html',
  styleUrls: ['./bi-reserva.page.scss'],
})
export class BiReservaPage implements OnInit {
  
  user: Usuario;
  usuarioLibPres: UsuarioLibPres[];

  constructor(
    private reserva_service: ReservacionService
  ) { }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem("usuario")) as Usuario;
  }

  reloadPrestamoSiNo() {
    this.reserva_service.listarLibrosDevueltosYNo(this.user.idUsuario).subscribe(
      (usuarioLibPres :UsuarioLibPres[]) => {
        console.log(usuarioLibPres);
        this.usuarioLibPres = usuarioLibPres;
      }
    );
  }

  ionViewWillEnter() {
    this.reloadPrestamoSiNo();
  }



  devolverLibro(idEstudiante, idLibro) {

    let data = {
      idBibliotecario: this.user.idUsuario,
      idEstudiante: idEstudiante,
      idLibro: idLibro
    }


    this.reserva_service.devolverLibro(data).subscribe(
      (status) => {
        console.log(status);
        this.reloadPrestamoSiNo();
      }
    );

  }

  



}
