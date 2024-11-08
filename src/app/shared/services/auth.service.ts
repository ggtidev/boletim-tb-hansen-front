import { Injectable } from '@angular/core';

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
      return localStorage.getItem('isAuthenticated') === 'true';
    }
    
    return false;
  }

  setAuthenticated(authenticated: boolean): void {
    this.isAuthenticatedUser = authenticated;

    if (this.isLocalStorageAvailable()) {
      localStorage.setItem('isAuthenticated', authenticated ? 'true' : 'false');
    }
  }

  logout(): void {
    this.isAuthenticatedUser = false;

    if (this.isLocalStorageAvailable()) {
      localStorage.removeItem('isAuthenticated');
    }
  }

  private checkLocalAuthentication(): boolean {
    if (this.isLocalStorageAvailable()) {
      return localStorage.getItem('isAuthenticated') === 'true';
    }
    return false;
  }
}