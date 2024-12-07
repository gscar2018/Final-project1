import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt';
import { FormsModule } from '@angular/forms'; // Import FormsModule
import { TopMenuComponent } from './top-menu/top-menu.component';  

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideClientHydration(withEventReplay()),
    provideHttpClient(withFetch()), // Enable fetch
    FormsModule, // Add FormsModule
    { provide: JWT_OPTIONS, useValue: JWT_OPTIONS }, // JWT_OPTIONS provider
    JwtHelperService, // JWT Helper Service
    TopMenuComponent, // Add TopMenu
  ],
};