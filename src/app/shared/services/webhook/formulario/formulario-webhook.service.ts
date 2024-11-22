import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// C.Job do dia - 11-11-2024

export interface TuberculoseData {
  nu_notificacao_atual?: string;
  dt_notificacao_atual?: string;
  no_nome_paciente?: string;
  tp_forma?: string;
  st_baciloscopia_1_mes?: string;
  st_baciloscopia_2_mes?: string;
  st_baciloscopia_3_mes?: string;
  st_baciloscopia_4_mes?: string;
  st_baciloscopia_5_mes?: string;
  st_baciloscopia_6_mes?: string;
  st_bacil_apos_6_mes?: string;
  nu_contato_examinado?: number;
  tp_antirretroviral_trat?: string;
  tp_molecular?: string;
  tp_situacao_encerramento?: string;
  dt_encerramento?: string;
  tp_cultura_escarro?: string;
  tp_sensibilidade?: string;
  tp_hiv?: string;
  tp_histopatologia?: string;
  ds_observacao?: string;
  ds_estabelecimento?: string;
  tp_tratamento_acompanhamento?: string;
  nu_contato?: string;
  co_municipio_transf?: string;
  tp_transf?: string;
}

export interface HanseniaseData {
  co_municipio_atual?: string;
  co_unidade_atual?: string;
  nu_notificacao_atual?: string;
  dt_notificacao_atual?: string;
  no_nome_paciente?: string;
  co_municipio_residencia_atual?: string;
  co_distrito_residencia_atual?: string;
  no_bairro_residencia_atual?: string;
  dt_ultimo_comparecimento?: string;
  tp_classific_operacao_atual?: string;
  tp_incapacidade_fisica_cura?: string;
  tp_esquema_terapeutico_atual?: string;
  dt_mudanca_esquema?: string;
  nu_contato_examinado?: number;
  tp_alta?: string;
  dt_alta?: string;
  ds_estabelecimento?: string;
  nu_contato_registrado?: string;
}

export type FormularioData = TuberculoseData | HanseniaseData;

@Injectable({
  providedIn: 'root',
})
export class FormularioWebhookService {
  private tuberculoseUrl = 'http://192.168.18.129:5678/webhook/g-tuberculose';
  private hanseniaseUrl = 'http://192.168.18.129:5678/webhook/g-hanseniase';

  constructor(private http: HttpClient) {}
  getData(tipo: string): Observable<FormularioData[]> {
    const normalizedTipo = tipo.toLowerCase();
    const url = normalizedTipo === 'tuberculose' ? this.tuberculoseUrl : this.hanseniaseUrl;
    console.log(`Fetching data from URL: ${url}`); 
    return this.http.get<FormularioData[]>(url);
  }
}
