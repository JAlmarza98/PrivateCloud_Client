import { Component, OnInit } from '@angular/core';
import { ICloudStorage } from 'app/interfaces/cloud-storage.interface';
import { CloudStorageService } from 'app/services/cloud-storage.service';
import { StorageService } from 'app/services/storage.service';
import { TOKEN_KEY } from 'app/services/authentication.service';
import { ActionSheetController, LoadingController } from '@ionic/angular';
import { finalize } from 'rxjs/operators';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{

  content: Array<string> = [];
  route!: string;
  token!: string;

  constructor(
    private cloudService: CloudStorageService,
    private storage: StorageService,
    public actionSheetController: ActionSheetController,
    private loadingController: LoadingController
  ) {}

  async ngOnInit() {
    await this.storage.check(TOKEN_KEY).then( resp =>  this.token = resp);
    this.getFolderContent();
  }

  async getFolderContent(route?: string) {
    const loading = await this.loadingController.create();
    await loading.present();

    this.cloudService.getCloudFolder(this.token, route).pipe(
      finalize(() => {
        loading.dismiss();
      }))
      .subscribe( async (resp: ICloudStorage ) => {
      if(resp.success) {
        this.content = [...resp.content.directories, ...resp.content.files];
        this.route = resp.path.replaceAll('\\', '_');
      } else {
        this.content = [];
      }
    });
  }

  navigateFolder(item: string){
    let routeTo = `${this.route}_${item}`;
    routeTo = this.formatPathToNavigate(routeTo);
    this.getFolderContent(routeTo);
  }

  formatPathToNavigate(route: string) {
    const directories = route.split('_');
    directories.shift();
    const finalPath = directories.join('_');
    return finalPath;
  }

  sideMenuNavigate(event) {
    if(event === 'home'){
      this.getFolderContent();
    }
  }

  async showActions(item: string) {
    const actionSheet = await this.actionSheetController.create({
      header: `Acciones - ${item}`,
      buttons: [{
        text: 'Eliminar',
        role: 'destructive',
        icon: 'trash',
        id: 'delete-button',
        data: {
          type: 'delete'
        },
        handler: () => {
          console.log('Delete clicked');
        }
      },
      // TODO: future feature
      //  {
      //   text: 'Share',
      //   icon: 'share',
      //   data: 10,
      //   handler: () => {
      //     console.log('Share clicked');
      //   }
      // },
       {
        text: 'Descargar',
        icon: 'cloud-download',
        handler: () => {
          console.log('Play clicked');
        }
      }, {
        text: 'Cancelar',
        icon: 'close',
        role: 'cancel',
      }]
    });
    await actionSheet.present();

    await actionSheet.onDidDismiss();
  }
}
