import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface CicloStruct {
  boletim_id: number;
  dt_inicio: string;
  dt_fim: string;
  status: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class BoletinsWebhookService {
  private webhookUrl = 'http://192.168.0.18:5678/webhook/ciclo';

  constructor(private http: HttpClient) { }

  getCiclo(cnes: string): Observable<CicloStruct> {
    const params = new HttpParams().set('co_cnes', cnes);
    return this.http.get<CicloStruct>(this.webhookUrl, { params });
  }
}
