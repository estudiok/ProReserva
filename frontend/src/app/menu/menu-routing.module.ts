import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MenuPage } from './menu.page';

const routes: Routes = [
  {
    path: '',
    component: MenuPage,
    children: [
      // Estudiante
      {
        path: 'eshome',
        loadChildren: () => import('../es-home/es-home.module').then( m => m.EsHomePageModule)
        
      },
      {
        path: 'esreserva',
        loadChildren: () => import('../es-reserva/es-reserva.module').then( m => m.EsReservaPageModule)
      },
      // Bibliotecario
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
      },
      {
        path: 'admin/home',
        loadChildren: () => import('../admin/home/home.module').then( m => m.HomePageModule)
      },
      {
        path: 'admin/add',
        loadChildren: () => import('../admin/add/add.module').then( m => m.AddPageModule)
      },
      {
        path: 'admin/reporteschart',
        loadChildren: () => import('../admin/reporteschart/reporteschart.module').then( m => m.ReporteschartPageModule)
      },
      {
        path: 'admin/reporte1',
        loadChildren: () => import('../admin/reporte1/reporte1.module').then( m => m.Reporte1PageModule)
      }
    

    ]

  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MenuPageRoutingModule {}
