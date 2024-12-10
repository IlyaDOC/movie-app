import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FilmsRoutingModule } from './films-routing.module';
import {FilmCollectionsComponent} from './film-collections/film-collections.component';
import {FilmPageComponent} from './film-page/film-page.component';
import {SharedModule} from '../../shared/shared.module';
import {CarouselModule} from 'ngx-owl-carousel-o';
import { FilmCollectionComponent } from './film-collection/film-collection.component';
import { FactDetailsComponent } from './fact-details/fact-details.component';


@NgModule({
  declarations: [
    FilmCollectionsComponent,
    FilmPageComponent,
    FilmCollectionComponent,
    FactDetailsComponent
  ],
    imports: [
        CommonModule,
        FilmsRoutingModule,
        SharedModule,
        CarouselModule,
    ]
})
export class FilmsModule { }
