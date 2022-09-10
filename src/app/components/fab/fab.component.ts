import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FileLikeObject } from 'ng2-file-upload';
import { NewFileComponent } from '../modals/new-file/new-file.component';
import { NewFolderComponent } from '../modals/new-folder/new-folder.component';

@Component({
  selector: 'app-fab',
  templateUrl: './fab.component.html',
  styleUrls: ['./fab.component.scss'],
})
export class FabComponent implements OnInit {
  @Output() newFolder = new EventEmitter<string>();
  @Output() uploadFiles = new EventEmitter<FileLikeObject[]>();

  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {}

  async openFolderModal(){
    const modal = await this.modalCtrl.create({
      component: NewFolderComponent,
    });
    modal.present();

    const { data, role } = await modal.onWillDismiss();

    if (role === 'confirm' && data !== undefined) {
      this.newFolder.emit(data);
    }
  }

  async openUploadModal(){
    const modal = await this.modalCtrl.create({
      component: NewFileComponent,
    });
    modal.present();

    const { data, role } = await modal.onWillDismiss();

    if (role === 'confirm' && data !== undefined) {
      this.uploadFiles.emit(data);
    }
  }
}
