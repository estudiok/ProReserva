import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReporteschartPageRoutingModule } from './reporteschart-routing.module';

import { ReporteschartPage } from './reporteschart.page';
import { NgApexchartsModule } from 'ng-apexcharts';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReporteschartPageRoutingModule,
    NgApexchartsModule
  ],
  declarations: [ReporteschartPage]
})
export class ReporteschartPageModule {}
