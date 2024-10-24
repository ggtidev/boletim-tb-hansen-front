import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatTableModule} from '@angular/material/table'

import { SidebarComponent } from '../../shared/sidebar/sidebar.component';

export interface mockData{
  district: number,
  name: string
};

const DATA:mockData[] = [
  {
    district: 3,
    name: "US 106 CS PROF JOAQUIM CAVALCANTE"
  },
  {
    district: 3,
    name: "US 106 CS PROF JOAQUIM CAVALCANTE"
  },
  {
    district: 3,
    name: "US 106 CS PROF JOAQUIM CAVALCANTE"
  },
]

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, MatTableModule, SidebarComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})

export class HomeComponent {
  columnsTitles:string[] = ['distritos', 'unidades', 'boletim', 'status'];
  data = DATA;
}
