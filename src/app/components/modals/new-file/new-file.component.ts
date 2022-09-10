import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FileLikeObject, FileUploader } from 'ng2-file-upload';

@Component({
  selector: 'app-new-file',
  templateUrl: './new-file.component.html',
  styleUrls: ['./new-file.component.scss'],
})
export class NewFileComponent implements OnInit {

  file: FileUploader = new FileUploader({});
  filesObjectLike!: FileLikeObject[];

  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {}

  changes() {
    this.filesObjectLike = this.getFiles();
  }

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  confirm() {
    return this.modalCtrl.dismiss(this.filesObjectLike, 'confirm');
  }

  getFiles(): FileLikeObject[] {
    return this.file.queue.map((fileItem) => fileItem.file);
  }

  onDeleteFile(file: FileLikeObject) {
    this.filesObjectLike = this.filesObjectLike.filter(item => item !== file);
  }
}
