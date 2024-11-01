import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { UnidadeWebhookService, WebHookStruct } from '../../shared/services/webhook/unidade/unidade-webhook.service';
import { HttpClientModule } from '@angular/common/http';
import { SidebarComponent } from '../../shared/sidebar/sidebar.component';
import { MatTableDataSource } from '@angular/material/table';
import { AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-unidade',
  standalone: true,
  imports: [CommonModule, MatTableModule, SidebarComponent, HttpClientModule, MatPaginatorModule],
  templateUrl: './unidade.component.html',
  styleUrls: ['./unidade.component.scss']
})
export class UnidadeComponent implements OnInit, AfterViewInit {
  isOpen = true;
  columnsTitles: string[] = ['distritos', 'unidades', 'boletim', 'status'];
  dataSource = new MatTableDataSource<WebHookStruct>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private unidadeWebhookService: UnidadeWebhookService) {}

  ngOnInit(): void {
    this.unidadeWebhookService.get().subscribe({
      next: (data) => {
        this.dataSource.data = data;
      },
      error: (err) => console.error('Erro ao buscar o elemento do webhook', err),
    });
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  setIsOpen() {
    this.isOpen = !this.isOpen;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value.toLowerCase();
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
