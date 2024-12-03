import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import {
  FormularioWebhookService,
  FormularioData,
} from '../../shared/services/webhook/formulario/formulario-webhook.service';
import { SidebarComponent } from '../../shared/sidebar/sidebar.component';
import { BreadcrumbComponent } from '../../shared/breadcrumb/breadcrumb.component';
import { OverlayFormComponent } from '../overlay-form/overlay-form.component';
import { AuthService } from '../../shared/services/auth.service';
import { secureLocalStorage } from '../../shared/services/crypto.service';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    SidebarComponent,
    BreadcrumbComponent,
  ],
  providers: [DatePipe],
})
export class FormularioComponent implements OnInit {
  tipo: string = '';
  distrito: string = '';
  unidade: string = '';
  ciclo: string = '';
  displayedColumns: string[] = [];
  dataSource = new MatTableDataSource<FormularioData>();
  //Implantação do modal de alerta (26/11/24).JV
  alertaModalVisivel: boolean = false;
  nomePrimeiroPaciente: string = '';
  outrosPacientesPendentes: boolean = false;
  isApenasUmPaciente: boolean = true;
  pacientesPendentes: string[] = [];
  mostrarPendentes: boolean = false;

  columnLabels: { [key: string]: string } = {
    nu_notificacao_atual: 'Nº DA NOTIFICAÇÃO ATUAL',
    dt_notificacao_atual: 'DATA DA NOTIFICAÇÃO ATUAL',
    no_nome_paciente: 'NOME DO PACIENTE',
    tp_forma: 'FORMA',
    st_baciloscopia_1_mes: 'BAC 1º MÊS',
    st_baciloscopia_2_mes: 'BAC 2º MÊS',
    st_baciloscopia_3_mes: 'BAC 3º MÊS',
    st_baciloscopia_4_mes: 'BAC 4º MÊS',
    st_baciloscopia_5_mes: 'BAC 5º MÊS',
    st_baciloscopia_6_mes: 'BAC 6º MÊS',
    st_bacil_apos_6_mes: 'BAC A. 6º MÊS',
    nu_contato_examinado: 'Nº CONT. EXAMINADO',
    tp_antirretroviral_trat: 'TARV',
    tp_molecular: 'TRM',
    tp_situacao_encerramento: 'SITUAÇÃO DE ENCERRAMENTO',
    dt_encerramento: 'DATA DE ENCERRAMENTO',
    tp_cultura_escarro: 'CULTURA',
    tp_sensibilidade: 'SENSIBILIDADE',
    tp_hiv: 'HIV',
    tp_histopatologia: 'HISTOPATOLOGIA',
    ds_observacao: 'OBSERVAÇÃO',
    // ds_estabelecimento: 'ESTABELECIMENTO',
    tp_tratamento_acompanhamento: 'TDO',
    co_municipio_transf: 'MUNICÍPIO DE TRANSFERÊNCIA',
    tp_transf: 'TIPO DE TRANSFERÊNCIA',
    // co_municipio_atual: 'MUNICÍPIO ATUAL',
    co_unidade_atual: 'UNIDADE ATUAL',
    co_municipio_residencia_atual: 'MUNICÍPIO DE RESIDÊNCIA ATUAL',
    co_distrito_residencia_atual: 'DISTRITO DE RESIDÊNCIA ATUAL',
    no_bairro_residencia_atual: 'BAIRRO DE RESIDÊNCIA ATUAL',
    dt_ultimo_comparecimento: 'ÚLTIMO COMPARECIMENTO',
    tp_classific_operacao_atual: 'CLASSIFICAÇÃO OPERACIONAL ATUAL',
    tp_incapacidade_fisica_cura: 'INCAPACIDADE FÍSICA CURA',
    tp_esquema_terapeutico_atual: 'ESQUEMA TERAPÊUTICO ATUAL',
    dt_mudanca_esquema: 'DATA DE MUDANÇA DE ESQUEMA',
    tp_alta: 'TIPO DE ALTA',
    dt_alta: 'DATA DE ALTA',
    nu_contato_registrado: 'TOTAL CONT IDENTIF',
    nu_contato: 'TOTAL CONT IDENTIF',
    obs_unidade: 'OBS UNIDADE',
    obs_distrito: 'OBS DISTRITO',
  };

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private formularioService: FormularioWebhookService,
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private datePipe: DatePipe,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['/login-redirect']);
      return;
    }

    const storedUserId = secureLocalStorage.getItem('user_id');
    const storedGrupo = secureLocalStorage.getItem('grupo');

    if (storedUserId && storedGrupo) {
      console.log(
        `Usuário autenticado: ID=${storedUserId}, Grupo=${storedGrupo}`
      );
    } else {
      console.error('Os dados de user_id ou grupo não estão disponíveis.');
    }

    const hoje = new Date().toISOString().split('T')[0];
    const alertaIgnorado = secureLocalStorage.getItem('alertaIgnoradoHoje');

    if (alertaIgnorado !== hoje) {
      secureLocalStorage.removeItem('alertaIgnoradoHoje');
    }

    this.route.queryParams.subscribe((params) => {
      this.tipo = params['tipo']?.toLowerCase();
      this.distrito = params['distrito'];
      this.unidade = params['unidade'];
      const cicloParam = params['ciclo'];
      if (cicloParam) {
        this.ciclo = this.formatCycle(cicloParam).toUpperCase();
      } else {
        this.ciclo = '-';
      }
      this.setColumns();
      this.loadData();
    });
  }
  //CONTATO PARA DEPOIS | tuberculose e HS  = contato: 'nu_contato_examinado', 'nu_contato_registrado', 'nu_contato','nu_contato_examinado','nu_contato_registrado'
  setColumns(): void {
    if (this.tipo === 'tuberculose') {
      this.displayedColumns = [
        'nu_notificacao_atual',
        'dt_notificacao_atual',
        'no_nome_paciente',
        'tp_forma',
        'st_baciloscopia_1_mes',
        'st_baciloscopia_2_mes',
        'st_baciloscopia_3_mes',
        'st_baciloscopia_4_mes',
        'st_baciloscopia_5_mes',
        'st_baciloscopia_6_mes',
        'st_bacil_apos_6_mes',
        'nu_contato_examinado',
        'nu_contato',
        'tp_hiv',
        'tp_antirretroviral_trat',
        'tp_cultura_escarro',
        'tp_molecular',
        'tp_histopatologia',
        'tp_sensibilidade',
        'tp_situacao_encerramento',
        'tp_tratamento_acompanhamento',
        'co_municipio_transf',
        'dt_ultimo_comparecimento',
        'dt_encerramento',
        'obs_unidade',
        'obs_distrito',
      ];
    } else {
      this.displayedColumns = [
        'nu_notificacao_atual',
        'dt_notificacao_atual',
        'no_nome_paciente',
        'co_unidade_atual',
        'co_municipio_residencia_atual',
        'co_distrito_residencia_atual',
        'no_bairro_residencia_atual',
        'dt_ultimo_comparecimento',
        'tp_classific_operacao_atual',
        'nu_contato_examinado',
        'nu_contato_registrado',
        'tp_incapacidade_fisica_cura',
        'tp_esquema_terapeutico_atual',
        'dt_mudanca_esquema',
        'tp_alta',
        'dt_alta',
        'obs_unidade',
        'obs_distrito',
      ];
    }
  }

  loadData(): void {
    this.pacientesPendentes = [];
    this.formularioService.getData(this.tipo).subscribe((data) => {
      this.dataSource.data = data.map((item: any) => {
        if (this.tipo === 'tuberculose') {
          item.dt_notificacao_atual = this.formatDate(
            item.dt_notificacao_atual
          );
          item.dt_encerramento = this.formatDate(item.dt_encerramento);
          item.dt_ultimo_comparecimento = this.formatDate(
            item.dt_ultimo_comparecimento
          );
        } else if (this.tipo === 'hanseniase') {
          item.dt_notificacao_atual = this.formatDate(
            item.dt_notificacao_atual
          );
          item.dt_ultimo_comparecimento = this.formatDate(
            item.dt_ultimo_comparecimento
          );
          item.dt_alta = this.formatDate(item.dt_alta);
          item.dt_mudanca_esquema = this.formatDate(item.dt_mudanca_esquema);
        }
        if (item.obs_distrito && item.obs_unidade) {
          item.display_obs_unidade = 'Respondido';
          item.highlight = false;
        } else if (item.obs_distrito && !item.obs_unidade) {
          this.pacientesPendentes.push(item.no_nome_paciente);
          item.highlight = true;
        } else {
          item.display_obs_unidade = item.obs_unidade;
          item.highlight = false;
        }
        return item;
      });

      if (
        this.pacientesPendentes.length > 0 &&
        !localStorage.getItem('alertaIgnoradoHoje')
      ) {
        this.nomePrimeiroPaciente = this.pacientesPendentes[0];
        this.isApenasUmPaciente = this.pacientesPendentes.length === 1;
        this.outrosPacientesPendentes = this.pacientesPendentes.length > 1;
        this.alertaModalVisivel = true;
      }
    });
  }

  getRowClass(row: any): string {
    return row.highlight ? 'highlight-row' : '';
  }

  formatDate(date: string | undefined): string {
    return date ? this.datePipe.transform(date, 'dd/MM/yyyy') || '-' : '-';
  }

  formatCycle(cycleDate: string): string {
    const formattedDate = new Date(cycleDate).toLocaleDateString('pt-BR', {
      month: 'long',
      year: 'numeric',
    });
    return formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);
  }

  verPendentes(): void {
    this.dataSource.filterPredicate = (data: any) =>
      data.obs_distrito && !data.obs_unidade;
    this.dataSource.filter = 'pendentes';
    this.alertaModalVisivel = false;
  }

  resetFiltro(): void {
    this.dataSource.filterPredicate = () => true;
    this.dataSource.filter = '';
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value
      .trim()
      .toLowerCase();
    this.dataSource.filter = filterValue;
    this.mostrarPendentes =
      this.dataSource.filteredData.length < this.dataSource.data.length;
  }

  fecharAlerta(ignorarHoje: boolean): void {
    this.alertaModalVisivel = false;
    if (ignorarHoje) {
      const hoje = new Date().toISOString().split('T')[0];
      localStorage.setItem('alertaIgnoradoHoje', hoje);
    }
  }
  openOverlay(paciente: any): void {
    const dialogRef = this.dialog.open(OverlayFormComponent, {
      width: '80%',
      height: '80%',
      data: {
        tipo: this.tipo,
        distrito: this.distrito || '-',
        ciclo: this.ciclo || '-',
        unidade: this.unidade || '-',
        obs_unidade: paciente.obs_unidade || '',
        obs_distrito: paciente.obs_distrito || '',
        ...paciente,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'updated') {
        this.loadData();
      }
    });
  }
  voltarParaBoletins(): void {
    this.router
      .navigate(['/boletins'], {
        queryParams: {
          cnes: this.unidade, // CNES da unidade
          distrito: this.distrito, // Distrito atual
        },
      })
      .then(() => {
        console.log('Retornando à página de boletins...');
      });
  }
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }
}
