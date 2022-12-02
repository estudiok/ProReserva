import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-es-menu',
  templateUrl: './es-menu.page.html',
  styleUrls: ['./es-menu.page.scss'],
})
export class EsMenuPage implements OnInit {


  pages = [
    {
      title: 'Home',
      url: '/esmenu/eshome',
      icon: 'home'
    },
    {
      title: 'Reservación',
      url: '/esmenu/esreserva',
      icon: 'calendar'
    }
  ]

  constructor() { }

  ngOnInit() {
  }

}
