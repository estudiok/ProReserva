import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BiRlibroPage } from './bi-rlibro.page';

const routes: Routes = [
  {
    path: '',
    component: BiRlibroPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BiRlibroPageRoutingModule {}
