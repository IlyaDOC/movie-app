import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {FilmsRoutingModule} from './films-routing.module';
import {FilmCollectionsComponent} from './film-collections/film-collections.component';
import {FilmPageComponent} from './film-page/film-page.component';
import {SharedModule} from '../../shared/shared.module';
import {CarouselModule} from 'ngx-owl-carousel-o';
import {FilmCollectionComponent} from './film-collection/film-collection.component';
import {Carousel} from "primeng/carousel";


@NgModule({
  declarations: [
    FilmCollectionsComponent,
    FilmPageComponent,
    FilmCollectionComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    CarouselModule,
    Carousel,
    FilmsRoutingModule,
  ]
})
export class FilmsModule {
}
