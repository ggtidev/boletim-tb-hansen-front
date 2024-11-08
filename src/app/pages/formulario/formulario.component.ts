import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { FormularioWebhookService, FormularioData } from '../../shared/services/webhook/formulario/formulario-webhook.service';
import { SidebarComponent } from '../../shared/sidebar/sidebar.component';


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
    SidebarComponent
  ]
})
export class FormularioComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = [
    'nu_notificacao_atual', 
    'dt_notificacao_atual', 
    'no_nome_paciente',
    'st_baciloscopia_2_mes', 
    'st_baciloscopia_4_mes', 
    'st_baciloscopia_6_mes', 
    'st_bacil_apos_6_mes', 
    'nu_contato_examinado', 
    'tp_antirretroviral_trat', 
    'tp_molecular', 
    'tp_situacao_encerramento', 
    'dt_encerramento', 
    'tp_cultura_escarro', 
    'tp_sensibilidade', 
    'tp_hiv', 
    'tp_histopatologia', 
    'ds_observacao', 
    'st_baciloscopia_1_mes', 
    'st_baciloscopia_3_mes', 
    'st_baciloscopia_5_mes', 
    'ds_estabelecimento', 
    'tp_tratamento_acompanhamento', 
    'tp_forma', 
    'nu_contato', 
    'co_municipio_transf'
  ];

  dataSource = new MatTableDataSource<FormularioData>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private formularioService: FormularioWebhookService) {}

  ngOnInit(): void {
    this.formularioService.getData().subscribe(data => {
      this.dataSource.data = data;
    });
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }
}