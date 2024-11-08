import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface FormularioData {
  co_municipio_atual: string;
  co_unidade_saude_atual: string;
  nu_notificacao_atual: string;
  dt_notificacao_atual: string;
  no_nome_paciente: string;
  st_baciloscopia_2_mes: string;
  st_baciloscopia_4_mes: string;
  st_baciloscopia_6_mes: string;
  st_bacil_apos_6_mes: string;
  nu_contato_examinado: number;
  tp_antirretroviral_trat: string;
  tp_molecular: string;
  tp_situacao_encerramento: string;
  dt_encerramento: string;
  tp_cultura_escarro: string;
  tp_sensibilidade: string;
  tp_hiv: string;
  tp_histopatologia: string;
  ds_observacao: string;
  st_baciloscopia_1_mes: string;
  st_baciloscopia_3_mes: string;
  st_baciloscopia_5_mes: string;
  ds_estabelecimento: string;
  tp_tratamento_acompanhamento: string;
  tp_forma: string;
  nu_contato: string;
  co_municipio_transf: string;
  tp_transf: string;
}

@Injectable({
  providedIn: 'root',
})
export class FormularioWebhookService {
  private formularioUrl = 'http://192.168.18.129:5678/webhook/g-tuberculose';

  constructor(private http: HttpClient) {}

  getData(): Observable<FormularioData[]> {
    return this.http.get<FormularioData[]>(this.formularioUrl);
  }
}