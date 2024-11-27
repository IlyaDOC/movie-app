import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout/layout.component';
import {RouterLink, RouterOutlet} from '@angular/router';
import { SidebarComponent } from './layout/sidebar/sidebar.component';
import { SearchComponent } from './layout/search/search.component';



@NgModule({
  declarations: [
    LayoutComponent,
    SidebarComponent,
    SearchComponent
  ],
  imports: [
    CommonModule,
    RouterLink,
    RouterOutlet,
  ]
})
export class SharedModule { }
