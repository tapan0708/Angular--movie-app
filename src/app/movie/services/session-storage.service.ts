import { Injectable } from '@angular/core';
import { authData } from '../models/authData.model';

@Injectable({
  providedIn: 'root',
})
export class SessionStorageService {
  constructor() {}

  //set auth data roles in session
  setLoggedInRoles(authData: authData) {
    sessionStorage.setItem('roles', JSON.stringify(authData));
  }

  //get auth data roles from session
  getLoggedInRoles(key: string): authData {
    return JSON.parse(sessionStorage.getItem(key) ?? '');
  }
}
