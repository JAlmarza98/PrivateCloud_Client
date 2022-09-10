import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';

import { HomePageRoutingModule } from './home-routing.module';

import { FabComponent } from 'app/components/fab/fab.component';
import { SideMenuComponent } from 'app/components/side-menu/side-menu.component';
import { NewFolderComponent } from 'app/components/modals/new-folder/new-folder.component';
import { NewFileComponent } from 'app/components/modals/new-file/new-file.component';
import { FileUploadModule } from 'ng2-file-upload';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    FileUploadModule
  ],
  declarations: [
    HomePage,
    SideMenuComponent,
    FabComponent,
    NewFolderComponent,
    NewFileComponent,
  ]
})
export class HomePageModule {}
