import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {FilmCollectionsComponent} from './film-collections/film-collections.component';
import {FilmPageComponent} from './film-page/film-page.component';
import {FilmCollectionComponent} from './film-collection/film-collection.component';

const routes: Routes = [
  {path: 'film-collections', component: FilmCollectionsComponent},
  {path: 'film', component: FilmPageComponent},
  {path: 'film-collections/:collection', component: FilmCollectionComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FilmsRoutingModule { }
