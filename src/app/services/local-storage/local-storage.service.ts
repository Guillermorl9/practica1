import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }
  // Set an item in local storage
  setItem(key: string, value: any): void {
    localStorage.setItem(key, value);
  }

  // Get an item from local storage
  getItem(key: string): string | null{
    return localStorage.getItem(key);
  }

  // Remove an item from local storage
  removeItem(key: string): void{
    localStorage.removeItem(key);
  }

  // Clear local storage
  clear(): void{
    localStorage.clear();
  }
}
