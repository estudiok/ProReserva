import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BiReservaPageRoutingModule } from './bi-reserva-routing.module';

import { BiReservaPage } from './bi-reserva.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BiReservaPageRoutingModule
  ],
  declarations: [BiReservaPage]
})
export class BiReservaPageModule {}
