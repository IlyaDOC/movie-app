import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MainComponent} from './views/main/main.component';
import {FilmCollectionsComponent} from './views/films/film-collections/film-collections.component';
import {FilmPageComponent} from './views/films/film-page/film-page.component';
import {FilmCollectionComponent} from './views/films/film-collection/film-collection.component';

const routes: Routes = [

  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'home', component: MainComponent},
  {
    path: '',
    component: FilmCollectionsComponent,
    loadChildren: () => import('./views/films/films.module').then(m => m.FilmsModule)
  },
  {
    path: '',
    component: FilmCollectionComponent,
    loadChildren: () => import('./views/films/films.module').then(m => m.FilmsModule)
  },
  {
    path: '',
    component: FilmPageComponent,
    loadChildren: () => import('./views/films/films.module').then(m => m.FilmsModule)
  },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
