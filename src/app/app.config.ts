import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { LOCALE_ID } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { CustomPaginatorIntl } from './shared/services/custom-paginator-intl.service';	
import { routes } from './app.routes';
import { provideAnimations } from '@angular/platform-browser/animations';
import { AuthGuard } from './shared/guards/auth.guard';
import { UsersWebhookService } from './shared/services/webhook/users/users-webhook.service';

// Registra o locale pt-BR
registerLocaleData(localePt, 'pt-BR');

export const AppConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(withFetch()),
    provideAnimations(),
    AuthGuard,
    UsersWebhookService,
    { provide: MatPaginatorIntl, useClass: CustomPaginatorIntl },
    { provide: LOCALE_ID, useValue: 'pt-BR' } 
  ]
};
