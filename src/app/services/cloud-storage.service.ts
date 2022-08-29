/* eslint-disable @typescript-eslint/naming-convention */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.prod';
import { StorageService } from 'app/services/storage.service';

const {baseURL} = environment;

@Injectable({
  providedIn: 'root'
})
export class CloudStorageService {

  constructor(private http: HttpClient, private storage: StorageService) { }

  getCloudFolder(token: string, route: string = '') {
    return this.http.get(`${baseURL}/dir/${route}`,  {headers: {Authorization: token}});
  }

  getCloudSpace() {
    return this.http.get(`${baseURL}/disk/disk-info`);
  }
}
