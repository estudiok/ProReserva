import { Component, OnInit } from '@angular/core';
import { Usuario } from '../models/usuario';
import { RolHelper } from '../models/roleshelp';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {
  
  pagesEstudiante = [
    {
      title: 'Home',
      url: '/menu/eshome',
      icon: 'home'
    },
    {
      title: 'Reservación',
      url: '/menu/esreserva',
      icon: 'calendar'
    }
  ]

  pagesBibliotecario = [
    {
      title: 'Home',
      url: '/menu/bihome',
      icon: 'home'
    },
    {
      title: 'Reservación',
      url: '/menu/bireserva',
      icon: 'calendar'
    },
    {
      title: 'Texto',
      url: '/menu/bihlibro',
      icon: 'book'
    }
  ]
  
  pagesAdmin = [
    {
      title: 'Home',
      url: '/menu/admin/home',
      icon: 'home'
    },
    {
      title: 'Reportes',
      url: '/menu/admin/reporteschart',
      icon: 'pie-chart'
    },
    {
      title: 'Reporte 1',
      url: '/menu/admin/reporte1',
      icon: 'pie-chart'
    }
  ]



  usuario: Usuario;
  pages = [];

  constructor(private navController: NavController) {
    this.usuario = JSON.parse(localStorage.getItem('usuario')) as Usuario;
  }

  ngOnInit() {
    if (this.usuario.idRol == RolHelper.admin) {
      this.pages = this.pagesAdmin;
    } else if (this.usuario.idRol == RolHelper.estudiante) {
      this.pages = this.pagesEstudiante;
    } else if (this.usuario.idRol == RolHelper.bibliotecario) {
      this.pages = this.pagesBibliotecario;
    }
  }

  logout() {
    // console.log('holas')
    localStorage.removeItem("usuario");
    this.navController.navigateRoot("/login")
  }

}
