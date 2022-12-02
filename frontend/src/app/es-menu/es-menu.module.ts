import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EsMenuPageRoutingModule } from './es-menu-routing.module';

import { EsMenuPage } from './es-menu.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EsMenuPageRoutingModule
  ],
  declarations: [EsMenuPage]
})
export class EsMenuPageModule {}
