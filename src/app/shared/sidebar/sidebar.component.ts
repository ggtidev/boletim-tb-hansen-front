import { Component } from '@angular/core';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [MatSelectModule, MatFormFieldModule, CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  isSubmenuOpen = false;

  constructor(private router: Router) {}

  toggleSubmenu() {
    this.isSubmenuOpen = !this.isSubmenuOpen;
  }

  logout() {
    this.router.navigate(['/auth']);
  }
}
