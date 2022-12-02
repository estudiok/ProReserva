import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BiHomePageRoutingModule } from './bi-home-routing.module';

import { BiHomePage } from './bi-home.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BiHomePageRoutingModule
  ],
  declarations: [BiHomePage]
})
export class BiHomePageModule {}
