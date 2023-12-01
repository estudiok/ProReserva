import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReporteschartPage } from './reporteschart.page';

const routes: Routes = [
  {
    path: '',
    component: ReporteschartPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReporteschartPageRoutingModule {}
