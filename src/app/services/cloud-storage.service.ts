import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.prod';

const {baseURL} = environment;

@Injectable({
  providedIn: 'root'
})
export class CloudStorageService {

  constructor(private http: HttpClient) { }

  getCloudFolder() {
    return this.http.get(`${baseURL}/dir/user1`);
  }
}
