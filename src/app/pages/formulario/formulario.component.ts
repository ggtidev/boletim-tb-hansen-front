import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { FormularioWebhookService, FormularioData } from '../../shared/services/webhook/formulario/formulario-webhook.service';
import { SidebarComponent } from '../../shared/sidebar/sidebar.component';
import { BreadcrumbComponent } from '../../shared/breadcrumb/breadcrumb.component';
import { OverlayFormComponent } from '../overlay-form/overlay-form.component';

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
  providers: [DatePipe]
})
export class FormularioComponent implements OnInit {
  tipo: string = '';
  distrito: string = '';
  unidade: string = '';
  ciclo: string = '';
  displayedColumns: string[] = [];
  dataSource = new MatTableDataSource<FormularioData>();

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
    st_bacil_apos_6_mes: 'BAC APÓS 6º MÊS',
    // nu_contato_examinado: 'TOTAL CONT. EXAMINADO',
    tp_antirretroviral_trat: 'TRATAMENTO ANTIRRETROVIRAL',
    tp_molecular: 'MOLECULAR',
    tp_situacao_encerramento: 'SITUAÇÃO DE ENCERRAMENTO',
    dt_encerramento: 'DATA DE ENCERRAMENTO',
    tp_cultura_escarro: 'CULTURA DE ESCARRO',
    tp_sensibilidade: 'SENSIBILIDADE',
    tp_hiv: 'HIV',
    tp_histopatologia: 'HISTOPATOLOGIA',
    ds_observacao: 'OBSEVAÇÃO',
    // ds_estabelecimento: 'ESTABELECIMENTO',
    tp_tratamento_acompanhamento: 'TRATA. ACOMPANHAMENTO',
    // nu_contato: 'CONTATO',
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
    // nu_contato_registrado: 'NÚMERO DE CONTATO REGISTRADO',
  };

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private formularioService: FormularioWebhookService,
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private datePipe: DatePipe
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.tipo = params['tipo']?.toLowerCase();
      this.distrito = params['distrito'];
      this.unidade = params['unidade'];
      const cicloParam = params['ciclo'];
      if (cicloParam) {
        const date = new Date(cicloParam);
        this.ciclo = date.toLocaleDateString('pt-BR', { month: 'long' }).toUpperCase();
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
        'nu_notificacao_atual', 'dt_notificacao_atual', 'no_nome_paciente',
        'tp_forma', 'st_baciloscopia_1_mes', 'st_baciloscopia_2_mes', 'st_baciloscopia_3_mes',
        'st_baciloscopia_4_mes', 'st_baciloscopia_5_mes', 'st_baciloscopia_6_mes',
        'st_bacil_apos_6_mes', 'tp_hiv', 'tp_antirretroviral_trat', 'tp_cultura_escarro',
        'tp_molecular', 'tp_histopatologia', 'tp_sensibilidade', 'tp_situacao_encerramento', 'tp_tratamento_acompanhamento',
        'co_municipio_transf', 'dt_encerramento', 'ds_observacao'

      ];
    } else {
      this.displayedColumns = [
        'nu_notificacao_atual', 'dt_notificacao_atual', 'no_nome_paciente', 'co_unidade_atual',
        'co_municipio_residencia_atual', 'co_distrito_residencia_atual',
        'no_bairro_residencia_atual', 'dt_ultimo_comparecimento', 'tp_classific_operacao_atual',
        'tp_incapacidade_fisica_cura', 'tp_esquema_terapeutico_atual', 'dt_mudanca_esquema', 'tp_alta', 'dt_alta'
      ];
    }
  }

  loadData(): void {
    this.formularioService.getData(this.tipo).subscribe(data => {
      this.dataSource.data = data.map((item: any) => { // Ajuste para `any`
        if (this.tipo === 'tuberculose') {
          item.dt_notificacao_atual = this.formatDate(item.dt_notificacao_atual);
          item.dt_encerramento = this.formatDate(item.dt_encerramento);
        } else if (this.tipo === 'hanseniase') {
          item.dt_notificacao_atual = this.formatDate(item.dt_notificacao_atual);
          item.dt_ultimo_comparecimento = this.formatDate(item.dt_ultimo_comparecimento);
          item.dt_alta = this.formatDate(item.dt_alta);
          item.dt_mudanca_esquema = this.formatDate(item.dt_mudanca_esquema);
        }
        return item;
      });
    });
  }
  
  formatDate(date: string | undefined): string {
    return date ? this.datePipe.transform(date, 'dd/MM/yyyy') || '-' : '-';
  }

  formatCycle(cycleDate: string): string {
    const formattedDate = new Date(cycleDate).toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' });
    return formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.dataSource.filter = filterValue;
  }

  openOverlay(paciente: any): void {
    const dialogRef = this.dialog.open(OverlayFormComponent, {
      width: '80%',
      height: '80%',
      data: {
        tipo: this.tipo || '-',
        distrito: this.distrito || '-',
        ciclo: this.ciclo || '-',
        unidade: this.unidade || '-',
        ...paciente
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'updated') {
        this.loadData();
      }
    });
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }
}

