import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home-component/home-component';
import { TeamComponent } from './team-component/team-component';


const routes: Routes = [
    {path: '',        component: HomeComponent},
    {path: 'team', component: TeamComponent},
    {path: 'teams', component: TeamComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
