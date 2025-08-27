import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection } from '@angular/core';

import { routes } from './app.routes';
import { primeNGProvider } from './core/providers/primeng';

export const appConfig: ApplicationConfig = {
  providers: [
    primeNGProvider(),
    provideHttpClient(),
    provideRouter(routes),
    provideAnimationsAsync(),
    provideZonelessChangeDetection(),
    provideBrowserGlobalErrorListeners(),
  ],
};
