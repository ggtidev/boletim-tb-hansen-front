import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { UnidadeWebhookService, WebHookStruct } from '../../shared/services/webhook/unidade/unidade-webhook.service';
import { HttpClientModule } from '@angular/common/http';
import { MatTableDataSource } from '@angular/material/table';
import { AuthService } from '../../shared/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-unidade',
  standalone: true,
  imports: [CommonModule, RouterLink, MatTableModule, HttpClientModule, MatPaginatorModule],
  templateUrl: './unidade.component.html',
  styleUrls: ['./unidade.component.scss']
})
export class UnidadeComponent implements OnInit, AfterViewInit {
  statusButtons:boolean[] = [];
  columnsTitles: string[] = ['distritos', 'unidades', 'boletim', 'status'];
  dataSource = new MatTableDataSource<WebHookStruct>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private unidadeWebhookService: UnidadeWebhookService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['/login-redirect']);
      return;
    }

    this.unidadeWebhookService.get().subscribe({
      next: (data) => {
        this.dataSource.data = data;
        this.statusButtons = Array(data.length).fill(true);
      },
      error: (err) => console.error('Erro ao buscar o elemento do webhook', err),
    });
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  setStatus(index:number) {
    this.statusButtons[index] = !this.statusButtons[index];
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value.toLowerCase();
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
