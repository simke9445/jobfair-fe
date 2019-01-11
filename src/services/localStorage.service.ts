import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  storage = window.localStorage;

  clear() {
    this.storage.clear();
  }

  get(key: string) {
    if (key) {
      return JSON.parse(this.storage.getItem(key) || '{}')[key];
    }

    return null;
  }

  set(key: string, value: any) {
    if (key) {
      this.storage.setItem(key, JSON.stringify({ [key]: value }));
    }
    
    return null;
  }

  remove(key: string) {
    if (key) {
      this.storage.removeItem(key);
    }

    return null;
  }
}