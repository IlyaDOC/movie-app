import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';
import { FilmCardComponent } from './components/film-card/film-card.component';
import {SearchComponent} from './components/search/search.component';
import { RemoveHtmlPipe } from './pipes/remove-html.pipe';
import { FilmFactAndBlooperComponent } from './components/film-fact-and-blooper/film-fact-and-blooper.component';
import {CarouselModule} from 'ngx-owl-carousel-o';
import { FilmDurationPipe } from './pipes/film-duration.pipe';
import { AgeFormatPipe } from './pipes/age-format.pipe';
import { StaffFilmFilterComponent } from './components/staff-film-filter/staff-film-filter.component';
import {PostComponent} from './components/post/post.component';
import {Carousel} from "primeng/carousel";


@NgModule({
  declarations: [
    SearchComponent,
    FilmCardComponent,
    RemoveHtmlPipe,
    FilmFactAndBlooperComponent,
    FilmDurationPipe,
    AgeFormatPipe,
    StaffFilmFilterComponent,
    PostComponent,
  ],
  exports: [
    FilmCardComponent,
    SearchComponent,
    RemoveHtmlPipe,
    FilmFactAndBlooperComponent,
    FilmDurationPipe,
    AgeFormatPipe,
    StaffFilmFilterComponent,
    PostComponent,
  ],
    imports: [
        CommonModule,
        RouterLink,
        RouterOutlet,
        RouterLinkActive,
        CarouselModule,
        Carousel,
    ]
})
export class SharedModule { }
