import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../config/config';

export interface CicloStruct {
  boletim_id: number;
  dt_inicio: string;
  dt_fim: string;
  status: boolean;
  contador: number;
}

@Injectable({
  providedIn: 'root'
})
export class BoletinsWebhookService {
  private webhookUrl = `${environment.baseUrl}${environment.endpoints.boletins}`;

  constructor(private http: HttpClient) { }

  getCiclo(cnes: string, tipo: string): Observable<CicloStruct[]> {
    const params = new HttpParams()
      .set('co_cnes', cnes)
      .set('tipo', tipo);
  
    return this.http.get<CicloStruct | CicloStruct[]>(this.webhookUrl, { params }).pipe(
      map(data => Array.isArray(data) ? data : [data])
    );
  }
}
