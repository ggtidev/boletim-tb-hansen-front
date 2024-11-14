import { Component, ViewChild } from '@angular/core';
import { SidebarComponent } from '../../../shared/sidebar/sidebar.component';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { OverlayFormComponent } from '../../overlay-form/overlay-form.component';


@Component({
  selector: 'app-formulario',
  standalone: true,
  imports: [SidebarComponent, MatTableModule, MatPaginatorModule, MatDialogModule],
  templateUrl: './formulario.component.html',
  styleUrl: './formulario.component.scss'
})
export class FormularioComponent {
  constructor(public dialog: MatDialog) {}

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

  dataSource = new MatTableDataSource([
    {
      co_municipio_atual: 'teste',
      co_unidade_saude_atual: 'teste',
      nu_notificacao_atual: 'teste',
      dt_notificacao_atual: 'teste',
      no_nome_paciente: 'teste',
      st_baciloscopia_2_mes: 'teste',
      st_baciloscopia_4_mes: 'teste',
      st_baciloscopia_6_mes: 'teste',
      st_bacil_apos_6_mes: 'teste',
      nu_contato_examinado: 1,
      tp_antirretroviral_trat: 'teste',
      tp_molecular: 'teste',
      tp_situacao_encerramento: 'teste',
      dt_encerramento: 'teste',
      tp_cultura_escarro: 'teste',
      tp_sensibilidade: 'teste',
      tp_hiv: 'teste',
      tp_histopatologia: 'teste',
      ds_observacao: 'teste',
      st_baciloscopia_1_mes: 'teste',
      st_baciloscopia_3_mes: 'teste',
      st_baciloscopia_5_mes: 'teste',
      ds_estabelecimento: 'teste',
      tp_tratamento_acompanhamento: 'teste',
      tp_forma: 'teste',
      nu_contato: 'teste',
      co_municipio_transf: 'teste',
      tp_transf: 'teste',
    }
  ])

  //@ViewChild(MatPaginator) paginator!: MatPaginator;

  openOverlay(): void {
    this.dialog.open(OverlayFormComponent, {
      width: '90dvw',
      height: '90dvh',
      panelClass: 'custom-dialog-container',
      backdropClass: 'custom-backdrop',
    });
  }
}
