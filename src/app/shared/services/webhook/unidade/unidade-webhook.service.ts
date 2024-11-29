import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../config/config';

export interface WebHookStruct {
    no_unidade_saude: string;
    distrito: number;
    cnes: string;
}

@Injectable({
  providedIn: 'root'
})
export class UnidadeWebhookService {
  private webhookUrl = `${environment.baseUrl}${environment.endpoints.unidade}`;

  constructor(private http: HttpClient) { }

  get(): Observable<WebHookStruct[]> {
    return this.http.get<WebHookStruct[]>(this.webhookUrl);
  }
}
