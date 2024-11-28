import {NgModule} from '@angular/core';
import {BrowserModule, provideClientHydration} from '@angular/platform-browser';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {SharedModule} from './shared/shared.module';
import {MainComponent} from './views/main/main.component';
import {RouterLink, RouterOutlet} from '@angular/router';
import {HTTP_INTERCEPTORS, provideHttpClient, withFetch, withInterceptorsFromDi} from '@angular/common/http';
import {RequestInterceptor} from './core/request.interceptor';
import {MAT_SNACK_BAR_DEFAULT_OPTIONS, MatSnackBarModule} from '@angular/material/snack-bar';
import {MatMenuModule} from '@angular/material/menu';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { FilmPageComponent } from './views/film-page/film-page.component';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    FilmPageComponent
  ],
  imports: [
    BrowserModule,
    SharedModule,
    RouterLink,
    RouterOutlet,
    BrowserAnimationsModule,
    MatSnackBarModule,
    MatMenuModule,
    AppRoutingModule
  ],
  providers: [
    provideClientHydration(),
    provideHttpClient(withInterceptorsFromDi(), withFetch()),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: RequestInterceptor,
      multi: true,
    },
    {
      provide: MAT_SNACK_BAR_DEFAULT_OPTIONS,
      useValue: {duration: 2500}
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
