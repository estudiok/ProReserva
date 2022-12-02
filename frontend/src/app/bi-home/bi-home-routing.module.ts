import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BiHomePage } from './bi-home.page';

const routes: Routes = [
  {
    path: '',
    component: BiHomePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BiHomePageRoutingModule {}
