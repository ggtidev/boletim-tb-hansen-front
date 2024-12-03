import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { BoletinsWebhookService, CicloStruct } from '../../shared/services/webhook/boletins/boletins-webhook.service';
import { UnidadeWebhookService } from '../../shared/services/webhook/unidade/unidade-webhook.service';
import { SidebarComponent } from '../../shared/sidebar/sidebar.component';
import { CommonModule } from '@angular/common';
import { BreadcrumbComponent } from '../../shared/breadcrumb/breadcrumb.component';
import { AuthService } from '../../shared/services/auth.service';
import { secureLocalStorage } from '../../shared/services/crypto.service';

@Component({
  selector: 'app-boletins',
  standalone: true,
  imports: [MatTableModule, MatPaginator, SidebarComponent, CommonModule, BreadcrumbComponent],
  templateUrl: './boletins.component.html',
  styleUrls: ['./boletins.component.scss']
})
export class BoletinsComponent implements OnInit {
  tipo: string = '';
  distrito: string = '';
  unidade: string = '';
  cnes: string = '';
  ciclo: string = '';
  columnsTitles: string[] = ['boletim_id', 'ciclo', 'inicio', 'fim', 'contador', 'status'];
  dataSource = new MatTableDataSource<CicloStruct>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private route: ActivatedRoute,
    private boletinsWebhookService: BoletinsWebhookService,
    private unidadeWebhookService: UnidadeWebhookService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['/login-redirect']);
      return;
    }

    const storedUserId = secureLocalStorage.getItem('user_id');
    const storedGrupo = secureLocalStorage.getItem('grupo');
  
    if (storedUserId && storedGrupo) {
      console.log(`Usuário autenticado: ID=${storedUserId}, Grupo=${storedGrupo}`);
    } else {
      console.error('Os dados de user_id ou grupo não estão disponíveis.');
    }
  
    this.route.params.subscribe((params) => {
      this.tipo = params['tipo']?.toLowerCase() === 'tuberculose' ? 'tuberculose' : 'hanseniase';
      this.distrito = params['distrito'];
      this.unidade = params['unidade'];
  
      this.unidadeWebhookService.get().subscribe({
        next: (unidades) => {
          const unidadeSelecionada = unidades.find((u) => u.no_unidade_saude === this.unidade);
          if (unidadeSelecionada) {
            this.cnes = unidadeSelecionada.cnes;
            this.obterDadosCiclo();
          } else {
            console.error('Unidade não encontrada');
          }
        },
        error: (err) => console.error('Erro ao buscar dados das unidades', err),
      });
    });
  }

  formatDateToCycle(date: string): string {
    const formattedDate = new Date(date).toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' });
    return formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);
  }

  irParaFormulario(ciclo: string): void {
    this.router.navigate(['/formulario'], {
      queryParams: {
        tipo: this.tipo,
        distrito: this.distrito,
        unidade: this.unidade,
        ciclo: ciclo,
      }
    });
  }

  reorganizarBoletins(boletins: CicloStruct[]): CicloStruct[] {
    const boletimAberto = boletins.find(b => b.status === true); 
    const boletinsFechados = boletins.filter(b => b.status === false); 
  
    let contador = 2; 
  
    if (boletimAberto) {
      boletimAberto.boletim_id = 1; 
    }
    boletinsFechados.forEach(b => {
      b.boletim_id = contador++; 
    });
    return boletimAberto ? [boletimAberto, ...boletinsFechados] : boletinsFechados;
  }

  obterDadosCiclo(): void {
    if (this.cnes && this.tipo) {
      this.boletinsWebhookService.getCiclo(this.cnes, this.tipo).subscribe({
        next: (data) => {
          this.dataSource.data = this.reorganizarBoletins(data);
        },
        error: (err) => console.error('Erro ao buscar dados do ciclo', err),
      });
    }
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value.toLowerCase();
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
