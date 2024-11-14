import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { ActivatedRoute } from '@angular/router';
import { FormularioWebhookService, FormularioData } from '../../shared/services/webhook/formulario/formulario-webhook.service';
import { SidebarComponent } from '../../shared/sidebar/sidebar.component';
import { BreadcrumbComponent } from '../../shared/breadcrumb/breadcrumb.component';

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
 // C.Job do dia - 12-11-2024;
  columnLabels: { [key: string]: string } = {
    nu_notificacao_atual: 'Nº da Notificação Atual',
    dt_notificacao_atual: 'Data da Notificação Atual',
    no_nome_paciente: 'Nome do Paciente',
    tp_forma: 'Forma',
    st_baciloscopia_1_mes: 'Baciloscopia 1º Mês',
    st_baciloscopia_2_mes: 'Baciloscopia 2º Mês',
    st_baciloscopia_3_mes: 'Baciloscopia 3º Mês',
    st_baciloscopia_4_mes: 'Baciloscopia 4º Mês',
    st_baciloscopia_5_mes: 'Baciloscopia 5º Mês',
    st_baciloscopia_6_mes: 'Baciloscopia 6º Mês',
    st_bacil_apos_6_mes: 'Baciloscopia Após 6º Mês',
    nu_contato_examinado: 'Total Contato Examinado',
    tp_antirretroviral_trat: 'Tratamento Antirretroviral',
    tp_molecular: 'Molecular',
    tp_situacao_encerramento: 'Situação de Encerramento',
    dt_encerramento: 'Data de Encerramento',
    tp_cultura_escarro: 'Cultura de Escarro',
    tp_sensibilidade: 'Sensibilidade',
    tp_hiv: 'HIV',
    tp_histopatologia: 'Histopatologia',
    ds_observacao: 'Observação',
    ds_estabelecimento: 'Estabelecimento',
    tp_tratamento_acompanhamento: 'Tratamento/Acompanhamento',
    nu_contato: 'Contato',
    co_municipio_transf: 'Município de Transferência',
    tp_transf: 'Tipo de Transferência',
    co_municipio_atual: 'Município Atual',
    co_unidade_atual: 'Unidade de Saúde Atual',
    co_municipio_residencia_atual: 'Município de Residência Atual',
    co_distrito_residencia_atual: 'Distrito de Residência Atual',
    no_bairro_residencia_atual: 'Bairro de Residência Atual',
    dt_ultimo_comparecimento: 'Último Comparecimento',
    tp_classific_operacao_atual: 'Classificação Operacional',
    tp_incapacidade_fisica_cura: 'Incapacidade Física na Cura',
    tp_esquema_terapeutico_atual: 'Esquema Terapêutico Atual',
    dt_mudanca_esquema: 'Data da Mudança de Esquema',
    tp_alta: 'Tipo de Alta',
    dt_alta: 'Data da Alta',
    nu_contato_registrado: 'Número de Contatos Registrados',
  };

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private formularioService: FormularioWebhookService,
    private route: ActivatedRoute,
    private datePipe: DatePipe
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.tipo = params['tipo']?.toLowerCase(); 
      console.log(`Tipo de boletim capturado: ${this.tipo}`);
      this.distrito = params['distrito'];
      this.unidade = params['unidade'];
      this.ciclo = params['ciclo'];
  
      this.setColumns();
      this.loadData();
    });
  }

  setColumns(): void {
    if (this.tipo === 'tuberculose') {
      this.displayedColumns = [
        'nu_notificacao_atual', 'dt_notificacao_atual', 'no_nome_paciente',
        'tp_forma', 'st_baciloscopia_1_mes', 'st_baciloscopia_2_mes', 'st_baciloscopia_3_mes',
        'st_baciloscopia_4_mes', 'st_baciloscopia_5_mes', 'st_baciloscopia_6_mes', 
        'st_bacil_apos_6_mes', 'nu_contato_examinado', 'tp_antirretroviral_trat', 
        'tp_molecular', 'tp_situacao_encerramento', 'dt_encerramento', 'tp_cultura_escarro', 
        'tp_sensibilidade', 'tp_hiv', 'tp_histopatologia', 'ds_observacao', 
        'ds_estabelecimento', 'tp_tratamento_acompanhamento', 'nu_contato', 'co_municipio_transf'
      ];
    } else {
      this.displayedColumns = [
        'co_municipio_atual', 'co_unidade_atual', 'nu_notificacao_atual', 'dt_notificacao_atual',
        'no_nome_paciente', 'co_municipio_residencia_atual', 'co_distrito_residencia_atual',
        'no_bairro_residencia_atual', 'dt_ultimo_comparecimento', 'tp_classific_operacao_atual',
        'tp_incapacidade_fisica_cura', 'tp_esquema_terapeutico_atual', 'dt_mudanca_esquema',
        'nu_contato_examinado', 'tp_alta', 'dt_alta', 'ds_estabelecimento', 'nu_contato_registrado'
      ];
    }
  }

  loadData(): void {
    this.formularioService.getData(this.tipo).subscribe(data => {
      this.dataSource.data = data.map(item => {
        item.dt_notificacao_atual = this.formatDate(item.dt_notificacao_atual);
        return item;
      });
    });
  }

  formatDate(date: string | undefined): string {
    return date ? this.datePipe.transform(date, 'dd/MM/yyyy') || '-' : '-';
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.dataSource.filter = filterValue;
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }
}
