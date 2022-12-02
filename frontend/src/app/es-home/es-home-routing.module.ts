import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EsHomePage } from './es-home.page';

const routes: Routes = [
  {
    path: '',
    component: EsHomePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EsHomePageRoutingModule {}
