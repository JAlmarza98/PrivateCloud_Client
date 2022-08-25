import { Component, OnInit } from '@angular/core';
import { ICloudStorage } from 'app/interfaces/cloud-storage.interface';
import { CloudStorageService } from 'app/services/cloud-storage.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{

  content: Array<string> = [];

  constructor(private cloudService: CloudStorageService) {}

  ngOnInit() {
    this.cloudService.getCloudFolder().subscribe( (resp: ICloudStorage ) => {
      this.content = [...resp.content.directories, ...resp.content.files];
    });
  }
}
