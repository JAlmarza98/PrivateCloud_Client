import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IDisck, IDisckResponse } from 'app/interfaces/disk.interface';
import { AuthenticationService } from 'app/services/authentication.service';
import { CloudStorageService } from 'app/services/cloud-storage.service';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss'],
})
export class SideMenuComponent implements OnInit{
  @Output() navigate = new EventEmitter<string>();
  disk!: IDisck;
  capacityValue!: number;

  constructor(
    private authService: AuthenticationService,
    private cloudService: CloudStorageService,
    private router: Router
  ) { }

  ngOnInit() {
    this.cloudService.getCloudSpace().subscribe( (resp: IDisckResponse) => {
      if(resp.success === true) {
        this.disk = resp.data;
        const [aux] = resp.data.capacity.split('%');
        this.capacityValue = parseInt(aux, 10)/100;
      }
    });
  }

  async logout() {
    await this.authService.logout();
    this.router.navigateByUrl('/', { replaceUrl: true });
  }

  navigateHome() {
    this.navigate.emit('home');
  }

  navigateShared() {
    this.navigate.emit('shared');
  }
}
