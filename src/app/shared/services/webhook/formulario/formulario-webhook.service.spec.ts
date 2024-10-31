import { TestBed } from '@angular/core/testing';

import { FormularioWebhookService } from './formulario-webhook.service';

describe('FormularioWebhookService', () => {
  let service: FormularioWebhookService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FormularioWebhookService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
