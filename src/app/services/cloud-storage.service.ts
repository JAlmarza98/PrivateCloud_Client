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

  createFolder(token: string, route: string = '', newFolder: string) {
    return this.http.post(`${baseURL}/dir/${route}`, {newFolder},  {headers: {Authorization: token}});
  }

  deleteCloudItem(token: string, route: string = '') {
    return this.http.delete(`${baseURL}/dir/${route}`,  {headers: {Authorization: token}});
  }

  uploadFilesToCloud(token: string, route: string = '', files: any) {
    return this.http.post(`${baseURL}/files/upload/${route}`, files ,{headers: {Authorization: token}});
  }
}
