import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BiHlibroPageRoutingModule } from './bi-hlibro-routing.module';

import { BiHlibroPage } from './bi-hlibro.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BiHlibroPageRoutingModule
  ],
  declarations: [BiHlibroPage]
})
export class BiHlibroPageModule {}
