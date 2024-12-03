import { Component, Inject, OnInit, Output, EventEmitter, output } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { environment } from '../../shared/config/config';


@Component({
  selector: 'app-overlay-form',
  standalone: true,
  templateUrl: './overlay-form.component.html',
  styleUrls: ['./overlay-form.component.scss'],
  imports: [CommonModule, FormsModule, HttpClientModule, MatDatepickerModule, MatNativeDateModule, MatFormFieldModule,
    MatInputModule],
})
export class OverlayFormComponent implements OnInit {
  @Output() dadosSalvos = new EventEmitter<void>();
  canEditObsDistrito: boolean = false;

  displayedGridColumns: string[] = [];
  tipo: string = '';
  campos = [
    'boletim_id',
    'co_municipio_atual',
    'co_unidade_saude_atual',
    'nu_notificacao_atual',
    'dt_notificacao_atual',
    'no_nome_paciente',
    'st_baciloscopia_1_mes',
    'st_baciloscopia_2_mes',
    'st_baciloscopia_3_mes',
    'st_baciloscopia_4_mes',
    'st_baciloscopia_5_mes',
    'st_baciloscopia_6_mes',
    'st_bacil_apos_6_mes',
    'nu_contato_examinado',
    'nu_contato_registrado',
    'tp_antirretroviral_trat',
    'tp_molecular',
    'tp_situacao_encerramento',
    'dt_encerramento',
    'tp_cultura_escarro',
    'tp_sensibilidade',
    'tp_hiv',
    'tp_histopatologia',
    'ds_observacao',
    'ds_estabelecimento',
    'tp_tratamento_acompanhamento',
    'tp_forma',
    'nu_contato',
    'co_municipio_transf',
    'tp_transf',
    'co_municipio_residencia_atual',
    'co_distrito_residencia_atual',
    'no_bairro_residencia_atual',
    'dt_ultimo_comparecimento',
    'tp_classific_operacao_atual',
    'tp_incapacidade_fisica_cura',
    'tp_esquema_terapeutico_atual',
    'dt_mudanca_esquema',
    'tp_alta',
    'dt_alta',

  ];

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
    tp_antirretroviral_trat: 'TARV',
    tp_molecular: 'TRM',
    tp_situacao_encerramento: 'SITUAÇÃO DE ENCERRAMENTO',
    dt_encerramento: 'DATA DE ENCERRAMENTO',
    tp_cultura_escarro: 'CULTURA',
    tp_sensibilidade: 'SENSIBILIDADE',
    tp_hiv: 'HIV',
    tp_histopatologia: 'HISTOPATOLOGIA',
    ds_observacao: 'OBSERVAÇÃO',
    tp_tratamento_acompanhamento: 'TDO',
    co_municipio_transf: 'MUNICÍPIO DE TRANSFERÊNCIA',
    co_municipio_residencia_atual: 'MUNICÍPIO DE RESIDÊNCIA ATUAL',
    co_distrito_residencia_atual: 'DISTRITO DE RESIDÊNCIA ATUAL',
    no_bairro_residencia_atual: 'BAIRRO DE RESIDÊNCIA ATUAL',
    dt_ultimo_comparecimento: 'DATA DO ÚLTIMO COMPARECIMENTO',
    tp_classific_operacao_atual: 'CLASSIFICAÇÃO OPERACIONAL ATUAL',
    tp_incapacidade_fisica_cura: 'AVALIAÇÃO DE INCAPACIDADE FÍSICA NO MOMENTO DA CURA',
    tp_esquema_terapeutico_atual: 'ESQUEMA TERAPÊUTICO ATUAL',
    dt_mudanca_esquema: 'DATA DE MUDANÇA DE ESQUEMA',
    tp_alta: 'TIPO DE SAÍDA',
    dt_alta: 'DATA DE ALTA',
    nu_contato_examinado: 'Nº CONT. EXAMINADO',
    nu_contato_registrado: 'TOTAL CONT IDENTIF',
    nu_contato: 'TOTAL CONT IDENTIF'
  };

  constructor(
    public dialogRef: MatDialogRef<OverlayFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    const userGroup = localStorage.getItem('grupo') || '';
    this.canEditObsDistrito = userGroup === 'Admin' || userGroup === 'Distrito';
    this.tipo = this.data?.tipo || '-';
    this.data.obs_distrito = this.data.obs_distrito || '';
    this.data.obs_unidade = this.data.obs_unidade || '';
    this.initializeColumns();
  }

  initializeColumns(): void {
    if (this.tipo === 'hanseniase') {
      this.displayedGridColumns = [
        'co_municipio_residencia_atual',
        'co_distrito_residencia_atual',
        'no_bairro_residencia_atual',
        'dt_ultimo_comparecimento',
        'tp_classific_operacao_atual',
        'tp_incapacidade_fisica_cura',
        'tp_esquema_terapeutico_atual',
        'nu_contato_examinado',
        'nu_contato_registrado',
        'dt_mudanca_esquema',
        'tp_alta',
        'dt_alta',
      ];
    } else if (this.tipo === 'tuberculose') {
      this.displayedGridColumns = [
        'st_baciloscopia_1_mes',
        'st_baciloscopia_2_mes',
        'st_baciloscopia_3_mes',
        'st_baciloscopia_4_mes',
        'st_baciloscopia_5_mes',
        'st_baciloscopia_6_mes',
        'st_bacil_apos_6_mes',
        'tp_antirretroviral_trat',
        'tp_molecular',
        'dt_ultimo_comparecimento',
        'tp_situacao_encerramento',
        'dt_encerramento',
        'tp_cultura_escarro',
        'tp_sensibilidade',
        'tp_hiv',
        'tp_histopatologia',
        // 'ds_observacao',
        'tp_tratamento_acompanhamento',
        'co_municipio_transf',
        'nu_contato_examinado',
        'nu_contato'
      ];
    }
  }

  isTextInput(columnName: string): boolean {
    const textFields = [
      // 'co_municipio_atual',
      'co_unidade_atual',
      'co_municipio_residencia_atual',
      'co_distrito_residencia_atual',
      'no_bairro_residencia_atual',
    ];
    return textFields.includes(columnName);
  }

  validateNumberInput(event: KeyboardEvent): void {
    const allowedKeys = ['Backspace', 'Tab', 'ArrowLeft', 'ArrowRight', 'Delete'];
    if (
      !allowedKeys.includes(event.key) &&
      (isNaN(Number(event.key)) || event.key === ' ' || event.key === '-')
    ) {
      event.preventDefault();
    }
  }  
  
  preventNegativeValue(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (Number(input.value) < 0) {
      input.value = '0';
    }
  }

  validatePasteInput(event: ClipboardEvent): void {
    const clipboardData = event.clipboardData?.getData('text') || '';
    if (!/^\d+$/.test(clipboardData)) {
      event.preventDefault();
    }
  }
  

  closeDialog(): void {
    this.dialogRef.close();
  }

  saveChanges(): void {
    const nu_notificacao_atual = this.data.nu_notificacao_atual;
    if (!nu_notificacao_atual) {
      console.error("O campo 'nu_notificacao_atual' é obrigatório para realizar a atualização.");
      return;
    }

    const payload: any = {
      nu_notificacao_atual: nu_notificacao_atual,
      obs_distrito: this.data.obs_distrito,
      obs_unidade: this.data.obs_unidade,
      tipo: this.tipo,
    };

    this.campos.forEach(campo => {
      if (this.data[campo] !== undefined && this.data[campo] !== null) {
        payload[campo] = this.data[campo];
      }
    });

    const apiUrl = this.tipo === 'hanseniase'
      ? `${environment.baseUrl}${environment.endpoints.uhanseniase}`
      : `${environment.baseUrl}${environment.endpoints.utuberculose}`;

    this.http.put(apiUrl, payload).subscribe(
      () => {
        this.dialogRef.close('updated');
      },
      error => {
        console.error('Falha na atualização:', error);
      }
    );
  }

  formatTitle(title: string): string {
    const words = title.split(' ');
    if (words.length > 0) {
      words[0] = words[0].slice(0, 3) + '.';
    }
    return words.join(' ');
  }

  getContainerClass(): string {
    return this.tipo === 'tuberculose' ? 'tuberculose' : 'hanseniase';
  }

  formatDate(dateString: string): string {
    if (!dateString) return '-';
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }

  getDisplayLabel(columnName: string): string {
    return this.columnLabels[columnName] || columnName;
  }

  getOptions(column: string): { value: string, label: string }[] {

    const dateFields = [
      'dt_notificacao_atual',
      'dt_encerramento',
      'dt_ultimo_comparecimento',
      'dt_mudanca_esquema',
      'dt_alta',
    ];

    if (dateFields.includes(column)) {
      return [];
    }

    const textOrDateFields = [
      'co_municipio_atual',
      'co_unidade_saude_atual',
      'co_municipio_residencia_atual',
      'co_distrito_residencia_atual',
      'no_bairro_residencia_atual',
      'dt_ultimo_comparecimento',
      'nu_contato_examinado',
      'nu_contato_registrado',
      'nu_contato',
    ];

    if (textOrDateFields.includes(column)) {
      return [];
    }
    const options: { [key: string]: { value: string, label: string }[] } = {
      st_baciloscopia_1_mes: [
        { value: '1', label: 'Positivo' },
        { value: '2', label: 'Negativo' },
        { value: '3', label: 'Não realizado' },
        { value: '4', label: 'Não se aplica' },
      ],
      st_baciloscopia_2_mes: [
        { value: '1', label: 'Positivo' },
        { value: '2', label: 'Negativo' },
        { value: '3', label: 'Não realizado' },
        { value: '4', label: 'Não se aplica' },
      ],
      st_baciloscopia_3_mes: [
        { value: '1', label: 'Positivo' },
        { value: '2', label: 'Negativo' },
        { value: '3', label: 'Não realizado' },
        { value: '4', label: 'Não se aplica' },
      ],
      st_baciloscopia_4_mes: [
        { value: '1', label: 'Positivo' },
        { value: '2', label: 'Negativo' },
        { value: '3', label: 'Não realizado' },
        { value: '4', label: 'Não se aplica' },
      ],
      st_baciloscopia_5_mes: [
        { value: '1', label: 'Positivo' },
        { value: '2', label: 'Negativo' },
        { value: '3', label: 'Não realizado' },
        { value: '4', label: 'Não se aplica' },
      ],
      st_baciloscopia_6_mes: [
        { value: '1', label: 'Positivo' },
        { value: '2', label: 'Negativo' },
        { value: '3', label: 'Não realizado' },
        { value: '4', label: 'Não se aplica' },
      ],
      st_bacil_apos_6_mes: [
        { value: '1', label: 'Positivo' },
        { value: '2', label: 'Negativo' },
        { value: '3', label: 'Não realizado' },
        { value: '4', label: 'Não se aplica' },
      ],
      tp_antirretroviral_trat: [
        { value: '1', label: 'Sim' },
        { value: '2', label: 'Não' },
        { value: '9', label: 'Ignorado' },
      ],
      tp_molecular: [
        { value: '1', label: 'Detectável sensível à Rifampicina' },
        { value: '2', label: 'Não detectável resistente à Rifampicina' },
        { value: '3', label: 'Não detectável' },
        { value: '4', label: 'Monoclusivo' },
        { value: '5', label: 'Não realizado' },
      ],
      tp_situacao_encerramento: [
        { value: '1', label: 'Cura' },
        { value: '2', label: 'Abandono' },
        { value: '3', label: 'Óbito por TB' },
        { value: '4', label: 'Óbito por outras causas' },
        { value: '5', label: 'Transferência' },
        { value: '6', label: 'Mudança de diagnóstico' },
      ],
      tp_cultura_escarro: [
        { value: '1', label: 'Positiva' },
        { value: '2', label: 'Negativa' },
        { value: '3', label: 'Em andamento' },
        { value: '4', label: 'Não realizado' },
      ],
      tp_sensibilidade: [
        { value: '1', label: 'Resistente à Isoniazida' },
        { value: '2', label: 'Resistente à Rifampicina' },
        { value: '3', label: 'Resistente a ambas' },
        { value: '4', label: 'Resistente a outras drogas' },
        { value: '5', label: 'Sensível' },
        { value: '6', label: 'Em andamento' },
        { value: '7', label: 'Não realizado' },
      ],
      tp_hiv: [
        { value: '1', label: 'Positiva' },
        { value: '2', label: 'Negativa' },
        { value: '3', label: 'Em andamento' },
        { value: '4', label: 'Não realizado' },
      ],
      tp_histopatologia: [
        { value: '1', label: 'Baar Positivo' },
        { value: '2', label: 'Sugestivo de TB' },
        { value: '3', label: 'Não Sugestivo de TB' },
        { value: '4', label: 'Em andamento' },
        { value: '5', label: 'Não realizado' },
      ],
      tp_tratamento_acompanhamento: [
        { value: '1', label: 'Em tratamento' },
        { value: '2', label: 'Encerrado' },
      ],
      co_municipio_transf: [
        { value: '1', label: 'Mesmo município' },
        { value: '2', label: 'Município diferente (mesma UF)' },
        { value: '3', label: 'UF diferente' },
        { value: '4', label: 'País diferente' },
      ],
      tp_classific_operacao_atual: [
        { value: '1', label: 'PB (Paucibacilar)' },
        { value: '2', label: 'MB (Multibacilar)' },
      ],
      tp_incapacidade_fisica_cura: [
        { value: '0', label: 'Grau zero' },
        { value: '1', label: 'Grau I' },
        { value: '2', label: 'Grau II' },
        { value: '3', label: 'Não avaliado' },
      ],
      tp_esquema_terapeutico_atual: [
        { value: '1', label: 'PQT/PB/6 doses' },
        { value: '2', label: 'PQT/MB/12 doses' },
        { value: '3', label: 'Outros Esquemas substitutivos' },
      ],
      tp_alta: [
        { value: '1', label: 'Cura' },
        { value: '2', label: 'Transf. para o mesmo município' },
        { value: '3', label: 'Transf. para outro município' },
        { value: '4', label: 'Transf. para outro Estado' },
        { value: '5', label: 'Transf. para outro país' },
        { value: '6', label: 'Óbito' },
        { value: '7', label: 'Abandono' },
        { value: '8', label: 'Erro diagnóstico' },
      ],
    };

    return [{ value: '-', label: '-' }, ...(options[column] || [])];
  }

  getTooltip(column: string, value: string): string {
    const tooltips: { [key: string]: { [key: string]: string } } = {
      st_baciloscopia_1_mes: {
        '1': 'Resultado positivo na baciloscopia do 1º mês',
        '2': 'Resultado negativo na baciloscopia do 1º mês',
        '3': 'Baciloscopia não realizada no 1º mês',
        '4': 'Baciloscopia não se aplica ao 1º mês',
      },
      st_baciloscopia_2_mes: {
        '1': 'Resultado positivo na baciloscopia do 2º mês',
        '2': 'Resultado negativo na baciloscopia do 2º mês',
        '3': 'Baciloscopia não realizada no 2º mês',
        '4': 'Baciloscopia não se aplica ao 2º mês',
      },
      st_baciloscopia_3_mes: {
        '1': 'Resultado positivo na baciloscopia do 3º mês',
        '2': 'Resultado negativo na baciloscopia do 3º mês',
        '3': 'Baciloscopia não realizada no 3º mês',
        '4': 'Baciloscopia não se aplica ao 3º mês',
      },
      st_baciloscopia_4_mes: {
        '1': 'Resultado positivo na baciloscopia do 4º mês',
        '2': 'Resultado negativo na baciloscopia do 4º mês',
        '3': 'Baciloscopia não realizada no 4º mês',
        '4': 'Baciloscopia não se aplica ao 4º mês',
      },
      st_baciloscopia_5_mes: {
        '1': 'Resultado positivo na baciloscopia do 5º mês',
        '2': 'Resultado negativo na baciloscopia do 5º mês',
        '3': 'Baciloscopia não realizada no 5º mês',
        '4': 'Baciloscopia não se aplica ao 5º mês',
      },
      st_baciloscopia_6_mes: {
        '1': 'Resultado positivo na baciloscopia do 6º mês',
        '2': 'Resultado negativo na baciloscopia do 6º mês',
        '3': 'Baciloscopia não realizada no 6º mês',
        '4': 'Baciloscopia não se aplica ao 6º mês',
      },
      st_bacil_apos_6_mes: {
        '1': 'Resultado positivo na baciloscopia após o 6º mês',
        '2': 'Resultado negativo na baciloscopia após o 6º mês',
        '3': 'Baciloscopia não realizada após o 6º mês',
        '4': 'Baciloscopia não se aplica após o 6º mês',
      },
      tp_hiv: {
        '1': 'HIV positivo',
        '2': 'HIV negativo',
        '3': 'Resultado em andamento',
        '4': 'Teste de HIV não realizado',
      },
      tp_antirretroviral_trat: {
        '1': 'Paciente em tratamento antirretroviral',
        '2': 'Paciente não está em tratamento antirretroviral',
        '9': 'Tratamento antirretroviral ignorado',
      },
      tp_situacao_encerramento: {
        '1': 'Caso encerrado com cura',
        '2': 'Caso encerrado por abandono',
        '3': 'Óbito por Tuberculose',
        '4': 'Óbito por outras causas',
        '5': 'Caso transferido para outra unidade',
        '6': 'Mudança no diagnóstico',
      },
      tp_molecular: {
        '1': 'Detectável sensível à Rifampicina',
        '2': 'Não detectável resistente à Rifampicina',
        '3': 'Resultado não detectável',
        '4': 'Resultado monoclusivo',
        '5': 'Teste não realizado',
      },
      tp_sensibilidade: {
        '1': 'Resistente apenas à Isoniazida',
        '2': 'Resistente apenas à Rifampicina',
        '3': 'Resistente a ambas',
        '4': 'Resistente a outras drogas de 1ª linha',
        '5': 'Sensível às drogas de 1ª linha',
        '6': 'Teste em andamento',
        '7': 'Teste não realizado',
      },
      tp_histopatologia: {
        '1': 'Baar Positivo',
        '2': 'Sugestivo de Tuberculose',
        '3': 'Não sugestivo de Tuberculose',
        '4': 'Histopatologia em andamento',
        '5': 'Histopatologia não realizada',
      },
      tp_tratamento_acompanhamento: {
        '1': 'Paciente em tratamento de acompanhamento',
        '2': 'Tratamento de acompanhamento encerrado',
      },
      co_municipio_transf: {
        '1': 'Paciente transferido dentro do mesmo município',
        '2': 'Paciente transferido para município diferente (mesma UF)',
        '3': 'Paciente transferido para outra UF',
        '4': 'Paciente transferido para outro país',
      },
      tp_classific_operacao_atual: {
        '1': 'Classificação operacional atual: Paucibacilar (PB)',
        '2': 'Classificação operacional atual: Multibacilar (MB)',
      },
      tp_incapacidade_fisica_cura: {
        '0': 'Grau zero de incapacidade física no momento da cura',
        '1': 'Grau I de incapacidade física no momento da cura',
        '2': 'Grau II de incapacidade física no momento da cura',
        '3': 'Incapacidade física não avaliada no momento da cura',
      },
      tp_esquema_terapeutico_atual: {
        '1': 'Esquema Terapêutico Atual: PQT/PB/6 doses',
        '2': 'Esquema Terapêutico Atual: PQT/MB/12 doses',
        '3': 'Esquema Terapêutico Atual: Outros esquemas substitutivos',
      },
      tp_alta: {
        '1': 'Tipo de Saída: Cura',
        '2': 'Tipo de Saída: Transferência para o mesmo município',
        '3': 'Tipo de Saída: Transferência para outro município',
        '4': 'Tipo de Saída: Transferência para outro Estado',
        '5': 'Tipo de Saída: Transferência para outro país',
        '6': 'Tipo de Saída: Óbito',
        '7': 'Tipo de Saída: Abandono',
        '8': 'Tipo de Saída: Erro diagnóstico',
      },
    };

    return tooltips[column]?.[value] || 'Sem legenda disponível';
  }
}
