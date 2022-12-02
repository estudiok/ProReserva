import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-bi-menu',
  templateUrl: './bi-menu.page.html',
  styleUrls: ['./bi-menu.page.scss'],
})
export class BiMenuPage implements OnInit {
  
  pages = [
    {
      title: 'Home',
      url: '/bimenu/bihome',
      icon: 'home'
    },
    {
      title: 'Reservación',
      url: '/bimenu/bireserva',
      icon: 'calendar'
    },
    {
      title: 'Texto',
      url: '/bimenu/bihlibro',
      icon: 'book'
    }
  ]

  constructor() { }

  ngOnInit() {
  }

}
