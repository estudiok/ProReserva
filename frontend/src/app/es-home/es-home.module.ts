import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EsHomePageRoutingModule } from './es-home-routing.module';

import { EsHomePage } from './es-home.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EsHomePageRoutingModule
  ],
  declarations: [EsHomePage]
})
export class EsHomePageModule {}
