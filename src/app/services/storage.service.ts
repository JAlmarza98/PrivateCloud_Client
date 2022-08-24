/* eslint-disable no-underscore-dangle */
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  private _storage: Storage | null = null;

  constructor(private storage: Storage) {
    this.initDB();
  }

  async initDB(){
    const storage = await this.storage.create();
    this._storage = storage;
  }

  public setRow(row: {key: string; value: any}) {
    const _row = this._storage?.set(row.key, row.value);
    return _row;
  }

  public set(key: string, value: any) {
    this._storage?.set(key, value);
  }

  async check(key: string) {
    const check = await this.storage.get(key);
    return check;
  }

  async remove(key: string) {
    const check = await this.storage.remove(key);
    return check;
  }
}
