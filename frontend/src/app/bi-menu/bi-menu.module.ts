import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BiMenuPageRoutingModule } from './bi-menu-routing.module';

import { BiMenuPage } from './bi-menu.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BiMenuPageRoutingModule
  ],
  declarations: [BiMenuPage]
})
export class BiMenuPageModule {}
