import { Component, OnInit } from '@angular/core';
import { environment } from '../../shared/config/config';

@Component({
  selector: 'app-login-redirect',
  template: '',
})

export class LoginRedirectComponent implements OnInit {
  ngOnInit(): void {
    if (typeof window !== 'undefined') {
      window.location.href = `${environment.baseUrl}${environment.endpoints.keycloak}`;
    }
  }
}