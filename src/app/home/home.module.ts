import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';

import { HomePageRoutingModule } from './home-routing.module';

import { SideMenuComponent } from '../components/side-menu/side-menu.component';
import { BreadcrumbComponent } from '../components/breadcrumb/breadcrumb.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule
  ],
  declarations: [HomePage, SideMenuComponent, BreadcrumbComponent]
})
export class HomePageModule {}
