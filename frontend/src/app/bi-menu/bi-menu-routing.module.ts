import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BiMenuPage } from './bi-menu.page';

const routes: Routes = [
  {
    path: '',
    component: BiMenuPage,
    children:[
      {
        path: 'bihome',
        loadChildren: () => import('../bi-home/bi-home.module').then( m => m.BiHomePageModule)
      },
      {
        path: 'bireserva',
        loadChildren: () => import('../bi-reserva/bi-reserva.module').then( m => m.BiReservaPageModule)
      },
      {
        path: 'bihlibro',
        loadChildren: () => import('../bi-hlibro/bi-hlibro.module').then( m => m.BiHlibroPageModule)
      },
      {
        path: 'birlibro',
        loadChildren: () => import('../bi-rlibro/bi-rlibro.module').then( m => m.BiRlibroPageModule)
      },
      {
        path: 'bielibro/:id',
        loadChildren: () => import('../bi-elibro/bi-elibro.module').then( m => m.BiElibroPageModule)
      }
    ]

  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BiMenuPageRoutingModule {}
