import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'app/services/authentication.service';
import { ISideMenu } from 'app/interfaces/sidemenu.interface';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss'],
})
export class SideMenuComponent {

  menuItems: Array<ISideMenu> = [
    {name:'Almacenamiento', route:'/home', icon:'folder-open-outline'},
    {name:'Compartido', route:'/home/shared', icon:'people-outline'},
  ];

  constructor(private authService: AuthenticationService, private router: Router) { }

  async logout() {
    await this.authService.logout();
    this.router.navigateByUrl('/', { replaceUrl: true });
  }
}
