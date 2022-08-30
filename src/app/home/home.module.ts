import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';

import { HomePageRoutingModule } from './home-routing.module';

import { FabComponent } from 'app/components/fab/fab.component';
import { SideMenuComponent } from 'app/components/side-menu/side-menu.component';
import { BreadcrumbComponent } from 'app/components/breadcrumb/breadcrumb.component';
import { NewFolderComponent } from 'app/components/modals/new-folder/new-folder.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule
  ],
  declarations: [
    HomePage,
    SideMenuComponent,
    BreadcrumbComponent,
    FabComponent,
    NewFolderComponent
  ]
})
export class HomePageModule {}
