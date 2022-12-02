import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EsMenuPage } from './es-menu.page';

const routes: Routes = [
  {
    path: '',
    component: EsMenuPage,
    children: [
      {
        path: 'eshome',
        loadChildren: () => import('../es-home/es-home.module').then( m => m.EsHomePageModule)
        
      },
      {
        path: 'esreserva',
        loadChildren: () => import('../es-reserva/es-reserva.module').then( m => m.EsReservaPageModule)
      }

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EsMenuPageRoutingModule {}
