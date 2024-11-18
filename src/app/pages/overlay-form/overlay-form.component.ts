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

  displayedFormaData = { nome: 'tp_forma', data: 'teste' };

  displayedHeaderInfo = [
    { nome: 'nu_notificacao_atual', data: 'teste' },
    { nome: 'dt_notificacao_atual', data: 'teste' },
    { nome: 'no_nome_paciente', data: 'teste' },
  ]

  displayedGridColumns = [
    { nome: 'Bac 1º Mês', data: 'teste' },
    { nome: 'Bac 2º Mês', data: 'teste' },
    { nome: 'Bac 3º Mês', data: 'teste' },
    { nome: 'Bac 4º Mês', data: 'teste' },
    { nome: 'Bac 5º Mês', data: 'teste' },
    { nome: 'Bac 6º Mês', data: 'teste' },
    { nome: 'Bac após 6º Mês', data: 'teste' },
    { nome: 'Total contat. identif', data: 'teste' },
    { nome: 'Total contat. exam.', data: 'teste' },
    { nome: 'HIV', data: 'teste' },
    { nome: 'TARV', data: 'teste' },
    { nome: 'Cultura', data: 'teste' },
    { nome: 'TRM-TB', data: 'teste' },
    { nome: 'Histopat', data: 'teste' },
    { nome: 'TS', data: 'teste' },
    { nome: 'Realizado TDO?', data: 'teste' },
    { nome: 'Situação Encerrada', data: 'teste' },
    { nome: 'Se Transf', data: 'teste' },
    { nome: 'Local de Transf (Mun/UF)', data: 'teste' },
    { nome: 'Data de encerramento', data: 'teste' },
    { nome: 'Data Últ. Comparecim.', data: 'teste' }
  ];
  

  closeDialog(): void {
    this.dialogRef.close();
  }
}
