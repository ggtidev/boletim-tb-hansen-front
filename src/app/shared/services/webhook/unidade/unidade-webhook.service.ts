import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface WebHookStruct {
    no_unidade_saude: string;
    distrito: number;
    cnes: string;
}

@Injectable({
  providedIn: 'root'
})
export class UnidadeWebhookService {
  private webhookUrl = 'http://192.168.18.23:5678/webhook/unidades';  // Substitua pela URL do seu webhook

  constructor(private http: HttpClient) { }

  get(): Observable<WebHookStruct[]> {
    return this.http.get<WebHookStruct[]>(this.webhookUrl);
  }
}
