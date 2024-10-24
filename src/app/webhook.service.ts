import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { WebHookStruct } from './web-hook-struct';

@Injectable({
  providedIn: 'root'
})
export class WebhookService {
  private webhookUrl = 'https://fazpramim.recife.pe.gov.br/webhook/boletim-tb-hs-unidades';  // Substitua pela URL do seu webhook


  constructor(private http:HttpClient) { }

  get():Observable<any>{
    return this.http.get<WebHookStruct>(this.webhookUrl)
  }
}
