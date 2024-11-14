import { Component } from '@angular/core';
import { MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-overlay-form',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule],
  templateUrl: './overlay-form.component.html',
  styleUrl: './overlay-form.component.scss'
})
export class OverlayFormComponent {
  constructor(public dialogRef: MatDialogRef<OverlayFormComponent>) {}

  displayedColumns = [
    { nome: 'nu_notificacao_atual', data: 'teste' },
    { nome: 'dt_notificacao_atual', data: 'teste' },
    { nome: 'no_nome_paciente', data: 'teste' },
    { nome: 'st_baciloscopia_2_mes', data: 'teste' },
    { nome: 'st_baciloscopia_4_mes', data: 'teste' },
    { nome: 'st_baciloscopia_6_mes', data: 'teste' },
    { nome: 'st_bacil_apos_6_mes', data: 'teste' },
    { nome: 'nu_contato_examinado', data: 'teste' },
    { nome: 'tp_antirretroviral_trat', data: 'teste' },
    { nome: 'tp_molecular', data: 'teste' },
    { nome: 'tp_situacao_encerramento', data: 'teste' },
    { nome: 'dt_encerramento', data: 'teste' },
    { nome: 'tp_cultura_escarro', data: 'teste' },
    { nome: 'tp_sensibilidade', data: 'teste' },
    { nome: 'tp_hiv', data: 'teste' },
    { nome: 'tp_histopatologia', data: 'teste' },
    { nome: 'ds_observacao', data: 'teste' },
    { nome: 'st_baciloscopia_1_mes', data: 'teste' },
    { nome: 'st_baciloscopia_3_mes', data: 'teste' },
    { nome: 'st_baciloscopia_5_mes', data: 'teste' },
    { nome: 'ds_estabelecimento', data: 'teste' },
    { nome: 'tp_tratamento_acompanhamento', data: 'teste' },
    { nome: 'tp_forma', data: 'teste' },
    { nome: 'nu_contato', data: 'teste' },
    { nome: 'co_municipio_transf', data: 'teste' }
  ];
  

  closeDialog(): void {
    this.dialogRef.close();
  }
}
