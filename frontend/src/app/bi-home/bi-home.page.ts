import { Component, OnInit } from '@angular/core';
import { Usuario } from '../models/usuario';
import { UsuarioLibPres } from '../models/usuariolibpres';
import { ReservacionService } from '../services/reservacion.service';

@Component({
  selector: 'app-bi-home',
  templateUrl: './bi-home.page.html',
  styleUrls: ['./bi-home.page.scss'],
})
export class BiHomePage implements OnInit {

  user: Usuario;
  usuarioLibPres: UsuarioLibPres[];

  constructor(
    private reserva_service: ReservacionService
  ) { }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('usuario')) as Usuario;
  }

  ionViewWillEnter() {
    this.reloadPresUserLib();
  }

  reloadPresUserLib(){
    this.reserva_service.listarReservacionPendiente().subscribe(
      (usuarioLibPres: UsuarioLibPres[]) => {
        console.log(usuarioLibPres);
        this.usuarioLibPres = usuarioLibPres;
      }
    );
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

  
  formatDateNow(dateSend) {
    let dateNow = dateSend;
    // let ggDate = new Date(dateNow);
    // ggDate.setDate(ggDate.getDate() + 1);
    // console.log(ggDate);
    let date = dateNow.toLocaleDateString().split('/')
    let auxDate = date[2] + '-' + date[1] + '-' + date[0];
    let hour = dateNow.toLocaleTimeString();
    let concat = auxDate + ' ' + hour;
     return concat;
  }

  aceptarSolicitud(idEstudiante, idLibro) {
    let dateNow = this.changeTimeZone(new Date() , 'America/La_Paz');
    let dateTomorrow = new Date(dateNow);
    dateTomorrow.setDate(dateNow.getDate() + 1);

    let data = {
      idBlibliotecario: this.user.idUsuario,
      estadoSolicitud: 2,
      estadoLibro: false,
      fechaInicio: this.formatDateNow(dateNow),
      fechaFin: this.formatDateNow(dateTomorrow),
      idEstudiante: idEstudiante,
      idLibro: idLibro,
      terminado: false
    }

    this.reserva_service.aceptarReservacion(data).subscribe(
      (status) => {
        console.log(status);
        this.reloadPresUserLib();
      }
    );
  }

  rechazarSolicitud(idEstudiante, idLibro) {
    let data = {
      idBlibliotecario: this.user.idUsuario,
      estadoSolicitud: 3,
      terminadoUser: true,
      idEstudiante: idEstudiante,
      idLibro: idLibro,
      terminado: false

    }
    
    let statusDisponible = this.reserva_service.rechazarReservacion(data).subscribe(
      (estado) => {
        console.log('status: ', estado);
      }
    );
    
    let statusDisponibleLibro = this.reserva_service.setDisponible(idLibro, true).subscribe(
      (estado) => {
        console.log('disponible: ', estado);
        this.reloadPresUserLib();
      }
    );



  }

}
