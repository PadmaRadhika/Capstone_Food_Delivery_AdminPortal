import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import routeConfig from './app/routes';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt';
import { provideAnimations } from '@angular/platform-browser/animations';

bootstrapApplication(AppComponent,
  {
    providers: [
      { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
      provideRouter(routeConfig),provideHttpClient(),JwtHelperService,provideAnimations()
    ]
  }
).catch(err => console.error(err));
