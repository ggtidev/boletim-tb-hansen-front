import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  isSubmenuOpen = false;
  isAuthorizedForUsersManager = false;

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit(): void {
    const userGroup = this.authService.getUserGroup();
    this.isAuthorizedForUsersManager = userGroup === 'Admin' || userGroup === 'Distrito';
  }

  toggleSubmenu() {
    this.isSubmenuOpen = !this.isSubmenuOpen;
  }

  navigateTo(route: string) {
    this.router.navigate([`/${route}`]);
  }

  logout() {
    this.authService.logout();
    window.location.href =
      'https://login.recife.pe.gov.br/auth/realms/recife/protocol/openid-connect/logout?&redirect_uri=http://192.168.18.129:4200/';
  }
}
