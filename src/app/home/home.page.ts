import { Component, OnInit } from '@angular/core';
import { ICloudStorage } from 'app/interfaces/cloud-storage.interface';
import { CloudStorageService } from 'app/services/cloud-storage.service';
import { StorageService } from 'app/services/storage.service';
import { TOKEN_KEY } from 'app/services/authentication.service';
import { ActionSheetController, AlertController, LoadingController } from '@ionic/angular';
import { finalize } from 'rxjs/operators';
import { FileUploader, FileLikeObject } from  'ng2-file-upload';
import { concat } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{

  content: Array<string> = [];
  route!: string;
  token!: string;
  selectedFolder!: string;
  folderPath!: Array<string>;

  public fileUploader: FileUploader = new FileUploader({});
  public hasBaseDropZoneOver = false;

  constructor(
    private cloudService: CloudStorageService,
    private storage: StorageService,
    public actionSheetController: ActionSheetController,
    private loadingController: LoadingController,
    private alertController: AlertController,
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
        this.folderPath = this.route.split('_');
        this.selectedFolder = this.folderPath[this.folderPath.length - 1];
      } else {
        this.content = [];
      }
    });
  }

  deleteCloudItem(route: string) {
    this.cloudService.deleteCloudItem(this.token, route)
    .subscribe(async (resp: {success: boolean; msg: string}) => {
      if(resp.success) {
        this.getFolderContent(this.formatPathToNavigate(this.route));
      } else {
        const alert = await this.alertController.create({
          header: 'Error al eliminar el archivo',
          message: resp.msg,
          buttons: ['OK'],
        });
        await alert.present();
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

  sideMenuNavigate(event: string) {
    if(event === 'home'){
      this.getFolderContent();
    }
  }

  segmentChanged(folderSelected: string) {
    const folderPath = this.route.split('_');
    const folderSplit = folderPath;
    const folderIndex = folderSplit.findIndex(folder => folder === folderSelected);
    folderSplit.splice(folderIndex + 1);

    let routeTo = folderSplit.join('_');
    routeTo = this.formatPathToNavigate(routeTo);
    this.getFolderContent(routeTo);
  }

  async deleteItem(item: string) {
    let routeTo = `${this.route}_${item}`;
    routeTo = this.formatPathToNavigate(routeTo);
    if(item.includes('.')){
      this.deleteCloudItem(routeTo);
    } else {
      const route = this.formatPathToNavigate(`${this.route}_${item}`);
      this.cloudService.getCloudFolder(this.token, route)
        .subscribe( async (resp: ICloudStorage ) => {
          if(resp.content.directories.length === 0 && resp.content.files.length === 0) {
            this.deleteCloudItem(routeTo);
          } else {
            if(await this.presentAlertConfirm() === false) {
              return;
            } else{
              this.deleteCloudItem(routeTo);
            };
          }
      });
    }
  }

  async createFolder(event: string) {
    this.cloudService.createFolder(this.token, this.formatPathToNavigate(this.route), event). subscribe(
      async (resp: {success: boolean; msg: string}) => {
      if(resp.success) {
        this.getFolderContent(this.formatPathToNavigate(this.route));
      } else {
        const alert = await this.alertController.create({
          header: 'Error al crear el directorio',
          message: resp.msg,
          buttons: ['OK'],
        });
        await alert.present();
      }
    });
  }

  async uploadFile(files: FileLikeObject[]) {
    const requests = [];

    files.forEach((file) => {
      const formData = new FormData();
      formData.append('file' , file.rawFile, file.name);
      requests.push(this.cloudService.uploadFilesToCloud(this.token,this.formatPathToNavigate(this.route), formData ));
    });

    concat(...requests).subscribe(
      async (res: {success: boolean; msg: string}) => {
        if(res.success) {
          this.getFolderContent(this.formatPathToNavigate(this.route));
        } else {
          const alert = await this.alertController.create({
            header: res.msg,
            buttons: ['OK'],
          });
          await alert.present();
        }
      },
      async (err) => {
          const alert = await this.alertController.create({
            header: 'Error',
            message: 'El archivo nop ha podido subirse a la nube',
            buttons: ['OK'],
          });
          await alert.present();
      }
    );
  }

  async showActions(item: string) {
    let actionBtns = [
      {
        text: 'Eliminar',
        role: 'destructive',
        icon: 'trash',
        id: 'delete-button',
        data: {
          type: 'delete'
        },
        handler: () => {
          this.deleteItem(item);
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
      }
    ];

    if(!item.includes('.')) {
      actionBtns = actionBtns.filter((btn) => btn.text !== 'Descargar');
    }

    const actionSheet = await this.actionSheetController.create({
      header: item,
      buttons: actionBtns
    });
    await actionSheet.present();

    await actionSheet.onDidDismiss();
  }

  async presentAlertConfirm() {
    return new Promise(async (resolve) => {
      const confirm = await this.alertController.create({
        header: 'Directorio lleno',
        message: 'Existen archivos dentro de este directorio que se perderan si lo elimina. ¿Desea continuar?',
        buttons: [
          {
            text: 'Cancelar',
            role: 'cancel',
            handler: () => resolve(false),
          },
          {
            text: 'Continuar',
            handler: () => resolve(true),
          },
        ],
      });

      await confirm.present();
    });
  }
}
