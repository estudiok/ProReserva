import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BiHlibroPage } from './bi-hlibro.page';

const routes: Routes = [
  {
    path: '',
    component: BiHlibroPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BiHlibroPageRoutingModule {}
