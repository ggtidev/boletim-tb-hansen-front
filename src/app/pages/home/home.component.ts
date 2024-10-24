import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatTableModule} from '@angular/material/table'
import { WebhookService } from '../../webhook.service';
import { HttpClientModule } from '@angular/common/http';
import { WebHookStruct } from '../../web-hook-struct';

import { SidebarComponent } from '../../shared/sidebar/sidebar.component';

/*export interface mockData{
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
]*/

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, MatTableModule, SidebarComponent, HttpClientModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})

export class HomeComponent implements OnInit {
  isOpen = true;
  columnsTitles:string[] = ['distritos', 'unidades', 'boletim', 'status'];
  data:WebHookStruct[] = [];

  constructor(private webHookService:WebhookService){}

  ngOnInit(): void {
    this.webHookService.get().subscribe({
      next: (data) => this.data = data,
      error: (err) => console.error('Erro ao buscar o elemento do webhook', err),
    })
  }

  setIsOpen(){
    this.isOpen = !this.isOpen;
  }
}
