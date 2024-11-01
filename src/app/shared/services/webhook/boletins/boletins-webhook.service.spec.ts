import { TestBed } from '@angular/core/testing';

import { BoletinsWebhookService } from './boletins-webhook.service';

describe('BoletinsWebhookService', () => {
  let service: BoletinsWebhookService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BoletinsWebhookService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
