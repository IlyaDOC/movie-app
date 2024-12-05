import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';
import { FilmCardComponent } from './components/film-card/film-card.component';
import {SearchComponent} from './components/search/search.component';
import { RemoveHtmlPipe } from './pipes/remove-html.pipe';





@NgModule({
  declarations: [
    SearchComponent,
    FilmCardComponent,
    RemoveHtmlPipe,
  ],
  exports: [
    FilmCardComponent,
    SearchComponent,
    RemoveHtmlPipe,
  ],
  imports: [
    CommonModule,
    RouterLink,
    RouterOutlet,
    RouterLinkActive,
  ]
})
export class SharedModule { }
