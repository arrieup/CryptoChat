import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConnexionPage } from './core/pages/connexion/connexion.page';
import { HomeComponent } from './core/pages/home/home.component';
import { AppGuard } from './app.guard';



const routes: Routes = [
  { path: '', redirectTo: '/connexion', pathMatch: 'full' },
  { path: 'connexion', component: ConnexionPage },
  { path: 'home', component: HomeComponent, canActivate: [AppGuard] }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
