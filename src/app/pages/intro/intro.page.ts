import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IonSlides } from '@ionic/angular';

import { INTRO_KEY } from 'app/guards/intro.guard';
import { StorageService } from 'app/services/storage.service';

@Component({
  selector: 'app-intro',
  templateUrl: './intro.page.html',
  styleUrls: ['./intro.page.scss'],
})
export class IntroPage {
  @ViewChild(IonSlides)slides: IonSlides;

  constructor(private router: Router, private storage: StorageService) { }

  next() {
    this.slides.slideNext();
  }

  start() {
    this.storage.set(INTRO_KEY, true);
    this.router.navigateByUrl('login', { replaceUrl:true });
  }
}
