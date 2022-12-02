import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EsReservaPageRoutingModule } from './es-reserva-routing.module';

import { EsReservaPage } from './es-reserva.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EsReservaPageRoutingModule
  ],
  declarations: [EsReservaPage]
})
export class EsReservaPageModule {}
