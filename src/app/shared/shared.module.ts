import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout/layout.component';
import {RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';
import { SidebarComponent } from './layout/sidebar/sidebar.component';
import { SearchComponent } from './layout/search/search.component';
import { FilmCardComponent } from './components/film-card/film-card.component';



@NgModule({
  declarations: [
    LayoutComponent,
    SidebarComponent,
    SearchComponent,
    FilmCardComponent
  ],
  exports: [
    FilmCardComponent
  ],
  imports: [
    CommonModule,
    RouterLink,
    RouterOutlet,
    RouterLinkActive,
  ]
})
export class SharedModule { }
