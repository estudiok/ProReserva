import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BiElibroPageRoutingModule } from './bi-elibro-routing.module';

import { BiElibroPage } from './bi-elibro.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    BiElibroPageRoutingModule
  ],
  declarations: [BiElibroPage]
})
export class BiElibroPageModule {}
