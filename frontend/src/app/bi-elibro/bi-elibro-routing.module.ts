import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BiElibroPage } from './bi-elibro.page';

const routes: Routes = [
  {
    path: '',
    component: BiElibroPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BiElibroPageRoutingModule {}
