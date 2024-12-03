import { Injectable } from '@angular/core';
import { secureLocalStorage } from '../services/crypto.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticatedUser = false;

  constructor() {
    this.isAuthenticatedUser = this.checkLocalAuthentication();
  }

  private isLocalStorageAvailable(): boolean {
    try {
      localStorage.setItem('test', 'test');
      localStorage.removeItem('test');
      return true;
    } catch {
      return false;
    }
  }

  isAuthenticated(): boolean {
    if (this.isAuthenticatedUser) {
      return true;
    }

    if (this.isLocalStorageAvailable()) {
      const authStatus = secureLocalStorage.getItem('isAuthenticated');
      return authStatus === true;
    }

    return false;
  }

  setAuthenticated(authenticated: boolean): void {
    this.isAuthenticatedUser = authenticated;

    if (this.isLocalStorageAvailable()) {
      secureLocalStorage.setItem('isAuthenticated', authenticated);
    }
  }

  logout(): void {
    this.isAuthenticatedUser = false;

    if (this.isLocalStorageAvailable()) {
      secureLocalStorage.removeItem('isAuthenticated');
      secureLocalStorage.removeItem('user_id');
      secureLocalStorage.removeItem('grupo');
    }
  }

  private checkLocalAuthentication(): boolean {
    if (this.isLocalStorageAvailable()) {
      return secureLocalStorage.getItem('isAuthenticated') === true;
    }
    return false;
  }

  setUserData(userId: string, grupo: string): void {
    if (this.isLocalStorageAvailable()) {
      secureLocalStorage.setItem('user_id', userId);
      secureLocalStorage.setItem('grupo', grupo);
    }
  }

  getUserId(): string | null {
    if (this.isLocalStorageAvailable()) {
      return secureLocalStorage.getItem('user_id');
    }
    return null;
  }

  getUserGroup(): string | null {
    if (this.isLocalStorageAvailable()) {
      return secureLocalStorage.getItem('grupo');
    }
    return null;
  }
}
