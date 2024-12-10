import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {FilmCollectionsComponent} from './film-collections/film-collections.component';
import {FilmPageComponent} from './film-page/film-page.component';
import {FilmCollectionComponent} from './film-collection/film-collection.component';
import {FactDetailsComponent} from './fact-details/fact-details.component';

const routes: Routes = [
  {path: 'film/:filmId', component: FilmPageComponent},
  {path: 'film-collections', component: FilmCollectionsComponent},
  {path: 'film-collections/:collection', component: FilmCollectionComponent},
  {path: 'film/:filmId/fact/:factId', component: FactDetailsComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FilmsRoutingModule { }
