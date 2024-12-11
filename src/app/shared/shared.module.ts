import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';
import { FilmCardComponent } from './components/film-card/film-card.component';
import {SearchComponent} from './components/search/search.component';
import { RemoveHtmlPipe } from './pipes/remove-html.pipe';
import { FilmFactAndBlooperComponent } from './components/film-fact-and-blooper/film-fact-and-blooper.component';
import {CarouselModule} from 'ngx-owl-carousel-o';
import { FilmDurationPipe } from './pipes/film-duration.pipe';





@NgModule({
  declarations: [
    SearchComponent,
    FilmCardComponent,
    RemoveHtmlPipe,
    FilmFactAndBlooperComponent,
    FilmDurationPipe,
  ],
  exports: [
    FilmCardComponent,
    SearchComponent,
    RemoveHtmlPipe,
    FilmFactAndBlooperComponent,
    FilmDurationPipe,
  ],
  imports: [
    CommonModule,
    RouterLink,
    RouterOutlet,
    RouterLinkActive,
    CarouselModule,
  ]
})
export class SharedModule { }
