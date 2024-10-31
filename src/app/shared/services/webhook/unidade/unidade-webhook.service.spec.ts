import { TestBed } from '@angular/core/testing';
import { UnidadeWebhookService } from './unidade-webhook.service';

describe('UnidadeWebhookService', () => {
  let service: UnidadeWebhookService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UnidadeWebhookService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
