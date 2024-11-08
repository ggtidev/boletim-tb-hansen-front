import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login-redirect',
  template: '',
})
export class LoginRedirectComponent implements OnInit {
  ngOnInit(): void {
    if (typeof window !== 'undefined') {
      window.location.href = 'http://localhost:5678/webhook/keycloak';
    }
  }
}