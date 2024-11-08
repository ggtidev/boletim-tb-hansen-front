import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withFetch } from '@angular/common/http';

import { routes } from './app.routes';
// import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { AuthGuard } from './shared/guards/auth.guard';
import { UsersWebhookService } from './shared/services/webhook/users/users-webhook.service';

export const AppConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(withFetch()),
    // provideClientHydration(),
    provideAnimations(),
    AuthGuard,
    UsersWebhookService
  ]
};
