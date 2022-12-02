import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BiReservaPage } from './bi-reserva.page';

const routes: Routes = [
  {
    path: '',
    component: BiReservaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BiReservaPageRoutingModule {}
