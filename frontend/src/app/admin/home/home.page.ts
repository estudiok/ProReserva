import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario';
import { ReservacionService } from 'src/app/services/reservacion.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  usuarios: Usuario[];

  constructor(
    private reserva_service: ReservacionService
  ) { }

  ngOnInit() {
   
  }

  ionViewWillEnter() {
    this.reserva_service.obtenerUsuarios().subscribe(
      (usuarios: Usuario[]) => {
        console.log(usuarios);
        this.usuarios = usuarios;
      }
    );
    
  }
  

}
