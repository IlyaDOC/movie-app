import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MainComponent} from './views/main/main.component';

const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'home', component: MainComponent},
  {
    path: '',
    loadChildren: () => import('./views/films/films.module').then(m => m.FilmsModule)
  },
  {
    path: '',
    loadChildren: () => import('./views/staff/staff.module').then(m => m.StaffModule)
  }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
