import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, from, Observable } from 'rxjs';
import { tap, switchMap } from 'rxjs/operators';
import { StorageService } from './storage.service';
import { environment } from '../../environments/environment.prod';

const TOKEN_KEY = 'my-token';
const {baseURL} = environment;

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  isAuthenticated: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(null);
  token = '';

  constructor(private http: HttpClient, private storage: StorageService) {
    this.loadToken();
  }

  async loadToken() {
    const token = await this.storage.check(TOKEN_KEY);
    if (token) {
      this.token = token.value;
      this.isAuthenticated.next(true);
    } else {
      this.isAuthenticated.next(false);
    }
  }

  login(email: string, password: string): Observable<any> {
    return this.http.post(`${baseURL}/auth/login`, {email, password}).pipe(
      switchMap((data: {success: boolean; msg: string; token?: string}) => from(this.storage.setRow({key: TOKEN_KEY, value: data.token}))),
      tap(_ => {
        this.isAuthenticated.next(true);
      })
    );
  }

  logout(): Promise<void> {
    this.isAuthenticated.next(false);
    return this.storage.remove(TOKEN_KEY);
  }

  register(userId: string, name: string, password: string): Observable<any> {
    return this.http.post(`${baseURL}/auth/confirm-user/${userId}`, {name, password});
  }
}
