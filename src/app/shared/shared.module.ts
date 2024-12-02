import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';
import { FilmCardComponent } from './components/film-card/film-card.component';
import {SearchComponent} from './components/search/search.component';



@NgModule({
  declarations: [
    SearchComponent,
    FilmCardComponent,
  ],
  exports: [
    FilmCardComponent,
    SearchComponent,
  ],
  imports: [
    CommonModule,
    RouterLink,
    RouterOutlet,
    RouterLinkActive,
  ]
})
export class SharedModule { }
