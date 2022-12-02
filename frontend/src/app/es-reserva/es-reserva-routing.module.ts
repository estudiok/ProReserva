import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EsReservaPage } from './es-reserva.page';

const routes: Routes = [
  {
    path: '',
    component: EsReservaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EsReservaPageRoutingModule {}
