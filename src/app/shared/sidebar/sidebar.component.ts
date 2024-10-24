import { Component } from '@angular/core';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [MatSelectModule, MatFormFieldModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})

export class SidebarComponent {
  linksValue = ['users', 'programs', 'perfils'];
}
