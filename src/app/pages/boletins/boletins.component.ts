import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { BoletinsWebhookService, CicloStruct } from '../../shared/services/webhook/boletins/boletins-webhook.service';
import { UnidadeWebhookService } from '../../shared/services/webhook/unidade/unidade-webhook.service';
import { SidebarComponent } from '../../shared/sidebar/sidebar.component';
import { CommonModule } from '@angular/common';
import { BreadcrumbComponent } from '../../shared/breadcrumb/breadcrumb.component';

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
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.tipo = params['tipo']?.toLowerCase() === 'tuberculose' ? 'tuberculose' : 'hanseniase';
      this.distrito = params['distrito'];
      this.unidade = params['unidade'];

      this.unidadeWebhookService.get().subscribe({
        next: (unidades) => {
          const unidadeSelecionada = unidades.find(u => u.no_unidade_saude === this.unidade);
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

  irParaFormulario(): void {
    this.router.navigate(['/formulario'], {
      queryParams: { tipo: this.tipo, distrito: this.distrito, unidade: this.unidade, ciclo: this.ciclo }
    });
  }

  obterDadosCiclo(): void {
    if (this.cnes) {
      this.boletinsWebhookService.getCiclo(this.cnes).subscribe({
        next: (data) => {
          this.dataSource.data = [data];
          this.ciclo = this.formatDateToCycle(data.dt_inicio);
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
  formatDateToCycle(date: string): string {
    const formattedDate = new Date(date).toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' });
    return formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);
  }
  
}
