import { Injectable } from '@angular/core';
import { CanLoad, Router } from '@angular/router';
import { StorageService } from '../services/storage.service';

export const INTRO_KEY = 'intro-seen';

@Injectable({
  providedIn: 'root'
})
export class IntroGuard implements CanLoad {
  constructor( private router: Router, private storage: StorageService) { }

  async canLoad(): Promise<boolean> {
    const hasSeenIntro = await this.storage.check(INTRO_KEY);
    if (hasSeenIntro) {
      return true;
    } else {
      this.router.navigateByUrl('/intro', { replaceUrl:true });
      return false;
    }
  }
}
