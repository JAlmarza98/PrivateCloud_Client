import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController, LoadingController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'app/services/authentication.service';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['../login/login.page.scss'],
})
export class RegisterPage implements OnInit {

  credentials: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthenticationService,
    private alertController: AlertController,
    private router: Router,
    private route: ActivatedRoute,
    private loadingController: LoadingController
  ) { }

  get name() {
    return this.credentials.get('name');
  }

  get password() {
    return this.credentials.get('password');
  }

  ngOnInit() {
    this.credentials = this.fb.group({
      name: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  async register() {
    const userId = this.route.snapshot.paramMap.get('userId');
    const loading = await this.loadingController.create();
    await loading.present();

    this.authService.register(userId, this.credentials.value.name, this.credentials.value.password).pipe(
      finalize(() => {
        loading.dismiss();
      }))
      .subscribe(
        async (res) => {
          if(res.success === false) {
            const alert = await this.alertController.create({
              header: 'Error al iniciar sesion',
              message: res.msg,
              buttons: ['OK'],
            });
            await alert.present();
          } else {
            const alert = await this.alertController.create({
              header: 'Cuenta completada',
              message: 'Se ha completado tu cuenta, por favor inicia sesión',
              buttons: ['OK'],
            });
            await alert.present();
            this.router.navigateByUrl('/login', { replaceUrl: true });
          }
        }
      );
  }

}
