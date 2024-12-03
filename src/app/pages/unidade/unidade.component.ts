import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { UnidadeWebhookService, WebHookStruct } from '../../shared/services/webhook/unidade/unidade-webhook.service';
import { HttpClientModule } from '@angular/common/http';
import { SidebarComponent } from '../../shared/sidebar/sidebar.component';
import { MatTableDataSource } from '@angular/material/table';
import { AuthService } from '../../shared/services/auth.service';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { BreadcrumbComponent } from '../../shared/breadcrumb/breadcrumb.component';
import { secureLocalStorage } from '../../shared/services/crypto.service';

@Component({
  selector: 'app-unidade',
  standalone: true,
  imports: [BreadcrumbComponent, CommonModule, MatTableModule, SidebarComponent, HttpClientModule, MatPaginatorModule, RouterModule],
  templateUrl: './unidade.component.html',
  styleUrls: ['./unidade.component.scss']
})
export class UnidadeComponent implements OnInit, AfterViewInit {
  isOpen = true;
  columnsTitles: string[] = ['distritos', 'cnes', 'unidades', 'boletim'];
  dataSource = new MatTableDataSource<WebHookStruct>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private unidadeWebhookService: UnidadeWebhookService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['/login-redirect']);
      return;
    }
  
    const storedUserId = this.authService.getUserId();
    const storedGrupo = this.authService.getUserGroup();
  
    if (storedUserId && storedGrupo) {
      console.log(`Usuário autenticado: ID=${storedUserId}, Grupo=${storedGrupo}`);
    } else {
      console.error('Os dados de user_id ou grupo não estão disponíveis.');
    }
  
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
